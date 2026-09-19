import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from "chart.js";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./styles.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Something went wrong");
  return data;
}

function Login({ onLogin }) {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setError("");
    try {
      if (register) await api("/auth/register", { method: "POST", body: JSON.stringify(form) });
      const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email: form.email, password: form.password }) });
      localStorage.setItem("token", data.access_token);
      onLogin();
    } catch (err) { setError(err.message); }
  }

  return <div className="login-page">
    <div className="login-card">
      <div className="brand">Darukaa<span>.Earth</span></div>
      <p className="muted">Carbon & biodiversity project dashboard</p>
      <form onSubmit={submit}>
        {register && <input placeholder="Name" required value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>}
        <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" required minLength="6" value={form.password} onChange={e => setForm({...form, password:e.target.value})}/>
        {error && <div className="error">{error}</div>}
        <button>{register ? "Create account" : "Login"}</button>
      </form>
      <button className="link-btn" onClick={() => setRegister(!register)}>
        {register ? "Already have an account? Login" : "Create a new account"}
      </button>
    </div>
  </div>
}

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  return loggedIn ? <Dashboard logout={() => {localStorage.removeItem("token"); setLoggedIn(false)}}/> : <Login onLogin={() => setLoggedIn(true)}/>;
}

function Dashboard({ logout }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sites, setSites] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [error, setError] = useState("");

  async function loadProjects() {
    try { setProjects(await api("/projects")); } catch (e) { setError(e.message); }
  }
  useEffect(() => { loadProjects(); }, []);

  async function selectProject(p) {
    setSelected(p);
    try { setSites(await api(`/projects/${p.id}/sites`)); } catch (e) { setError(e.message); }
  }

  async function createProject(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    try {
      await api("/projects", { method:"POST", body:JSON.stringify({name:f.get("name"), description:f.get("description")}) });
      e.target.reset(); setShowProject(false); loadProjects();
    } catch(e) { setError(e.message); }
  }

  return <div className="app">
    <header>
      <div className="brand">Darukaa<span>.Earth</span></div>
      <div className="header-right"><span>Project Dashboard</span><button className="logout" onClick={logout}>Logout</button></div>
    </header>
    <main>
      <aside>
        <div className="side-title">Projects <button onClick={()=>setShowProject(true)}>+</button></div>
        {projects.map(p => <div key={p.id} className={"project-item "+(selected?.id===p.id?"active":"")} onClick={()=>selectProject(p)}>
          <b>{p.name}</b><small>{p.description || "No description"}</small>
        </div>)}
        {!projects.length && <p className="muted">Create your first project.</p>}
      </aside>
      <section className="content">
        <div className="topline">
          <div><h1>{selected ? selected.name : "Welcome"}</h1><p>{selected ? selected.description : "Manage carbon and biodiversity sites from one place."}</p></div>
          {selected && <button onClick={()=>document.getElementById("map").scrollIntoView({behavior:"smooth"})}>View map</button>}
        </div>
        {error && <div className="error">{error}</div>}
        {selected ? <ProjectView project={selected} sites={sites} setSites={setSites}/> :
          <div className="empty"><h2>Select a project</h2><p>Create a project to start adding geographical sites.</p><button onClick={()=>setShowProject(true)}>Create project</button></div>}
      </section>
    </main>
    {showProject && <div className="modal"><form onSubmit={createProject} className="modal-card">
      <h2>New project</h2><input name="name" placeholder="Project name" required/>
      <textarea name="description" placeholder="Short description"/>
      <div className="actions"><button type="button" className="secondary" onClick={()=>setShowProject(false)}>Cancel</button><button>Create</button></div>
    </form></div>}
  </div>
}

function ProjectView({ project, sites, setSites }) {
  const mapRef = useRef(null), mapNode = useRef(null), drawRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [form, setForm] = useState({name:"",area_hectares:10,carbon_stock:100,biodiversity_score:60,tree_cover:30});
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    if (!TOKEN || mapRef.current || !mapNode.current) return;
    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({container:mapNode.current, style:"mapbox://styles/mapbox/outdoors-v12", center:[77.5946,12.9716], zoom:5});
    const draw = new MapboxDraw({displayControlsDefault:false, controls:{polygon:true, trash:true}});
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(draw, "top-left");
    drawRef.current = draw;
    map.on("draw.create", e => {
      const coords = e.features[0].geometry.coordinates;
      setDrawing(true);
      setForm(f => ({...f, coordinates:coords}));
      draw.deleteAll();
    });
    map.on("load", () => {
      const geo = {type:"FeatureCollection", features:[]};
      if (!map.getSource("sites")) {
        map.addSource("sites", {type:"geojson", data:geo});
        map.addLayer({id:"site-fill",type:"fill",source:"sites",paint:{"fill-opacity":0.35}});
        map.addLayer({id:"site-line",type:"line",source:"sites",paint:{"line-width":2}});
        map.on("click","site-fill",e => {
          const id=e.features[0].properties.id;
          const s=sites.find(x=>String(x.id)===String(id));
          if(s) setSelectedSite(s);
        });
      }
    });
    mapRef.current = map;
    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const updateSites = () => {
      const geo = {type:"FeatureCollection", features:sites.map(s => ({type:"Feature", geometry:s.geometry, properties:{id:s.id,name:s.name}}))};
      const source = map.getSource("sites");
      if (source) source.setData(geo);
    };
    if (map.isStyleLoaded()) updateSites();
    else map.once("load", updateSites);
    return () => map.off("load", updateSites);
  }, [sites]);

  async function saveSite(e) {
    e.preventDefault();
    try {
      const saved = await api(`/projects/${project.id}/sites`, {method:"POST", body:JSON.stringify(form)});
      setSites(prev=>[...prev,saved]); setDrawing(false);
      setForm({name:"",area_hectares:10,carbon_stock:100,biodiversity_score:60,tree_cover:30});
    } catch(e) { alert(e.message); }
  }

  const chartData = selectedSite ? {
    labels:["Carbon Stock","Biodiversity","Tree Cover"],
    datasets:[{label:"Current value", data:[selectedSite.carbon_stock,selectedSite.biodiversity_score,selectedSite.tree_cover]}]
  } : null;

  return <div>
    <div className="stats">
      <div><b>{sites.length}</b><span>Sites</span></div>
      <div><b>{sites.reduce((a,s)=>a+s.area_hectares,0).toFixed(1)}</b><span>Total hectares</span></div>
      <div><b>{sites.length ? (sites.reduce((a,s)=>a+s.biodiversity_score,0)/sites.length).toFixed(0) : 0}</b><span>Avg biodiversity</span></div>
    </div>
    <div id="map" ref={mapNode} className="map">{!TOKEN && <div className="map-warning">Add VITE_MAPBOX_TOKEN to frontend/.env to use the map.</div>}</div>
    {drawing && <form className="site-form" onSubmit={saveSite}>
      <h3>Add site</h3>
      <input placeholder="Site name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <div className="grid2">
        <input type="number" placeholder="Area (ha)" value={form.area_hectares} onChange={e=>setForm({...form,area_hectares:+e.target.value})}/>
        <input type="number" placeholder="Carbon stock" value={form.carbon_stock} onChange={e=>setForm({...form,carbon_stock:+e.target.value})}/>
        <input type="number" placeholder="Biodiversity score" value={form.biodiversity_score} onChange={e=>setForm({...form,biodiversity_score:+e.target.value})}/>
        <input type="number" placeholder="Tree cover %" value={form.tree_cover} onChange={e=>setForm({...form,tree_cover:+e.target.value})}/>
      </div>
      <button>Save site</button>
    </form>}
    <div className="below">
      <div className="site-list"><h2>Sites</h2>{sites.map(s=><div className="site-row" key={s.id} onClick={()=>setSelectedSite(s)}><div><b>{s.name}</b><small>{s.area_hectares} ha</small></div><span>{s.biodiversity_score}</span></div>)}{!sites.length&&<p className="muted">Use the polygon tool on the map to add a site.</p>}</div>
      <div className="analytics"><h2>{selectedSite ? selectedSite.name : "Site analytics"}</h2>{selectedSite ? <><p className="muted">Current project indicators</p><Bar data={chartData} options={{responsive:true,plugins:{legend:{display:false}}}}/><div className="mini-grid"><div>Carbon<br/><b>{selectedSite.carbon_stock}</b></div><div>Biodiversity<br/><b>{selectedSite.biodiversity_score}</b></div><div>Tree cover<br/><b>{selectedSite.tree_cover}%</b></div></div></> : <p className="muted">Click a site to see its analytics.</p>}</div>
    </div>
  </div>
}

createRoot(document.getElementById("root")).render(<App />);
