import React, { useState } from "react";

const projectsData = [
  {
    name: "Western Ghats Forest",
    location: "Karnataka, India",
    area: "12,450 ha",
    sites: 8,
    status: "Active",
  },
  {
    name: "Amazon Biodiversity",
    location: "Brazil",
    area: "8,720 ha",
    sites: 5,
    status: "Active",
  },
  {
    name: "Green Valley Restoration",
    location: "Kerala, India",
    area: "5,320 ha",
    sites: 3,
    status: "Planning",
  },
];

const sitesData = [
  {
    name: "Western Ghats Site A",
    latitude: "12.9",
    longitude: "77.6",
    status: "Active",
  },
  {
    name: "Western Ghats Site B",
    latitude: "13.1",
    longitude: "77.8",
    status: "Active",
  },
  {
    name: "Amazon Site A",
    latitude: "-3.4",
    longitude: "-60.0",
    status: "Active",
  },
  {
    name: "Green Valley Site A",
    latitude: "10.8",
    longitude: "76.3",
    status: "Monitoring",
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");

  const [email, setEmail] = useState("admin@darukaa.earth");
  const [password, setPassword] = useState("123456");

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSiteForm, setShowSiteForm] = useState(false);

  const [projects, setProjects] = useState(projectsData);
  const [sites, setSites] = useState(sitesData);

  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    area: "",
    sites: "",
  });

  const [newSite, setNewSite] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const login = () => {
    if (email.trim() && password.trim()) {
      setLoggedIn(true);
      setPage("Dashboard");
    } else {
      alert("Please enter email and password.");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setPage("Dashboard");
  };

  const createProject = () => {
    if (!newProject.name.trim() || !newProject.location.trim()) {
      alert("Please enter project name and location.");
      return;
    }

    const project = {
      name: newProject.name.trim(),
      location: newProject.location.trim(),
      area: newProject.area.trim() || "0 ha",
      sites: Number(newProject.sites) || 0,
      status: "Planning",
    };

    setProjects((previousProjects) => [
      ...previousProjects,
      project,
    ]);

    setNewProject({
      name: "",
      location: "",
      area: "",
      sites: "",
    });

    setShowProjectForm(false);
  };

  const addSite = () => {
    if (
      !newSite.name.trim() ||
      !newSite.latitude.trim() ||
      !newSite.longitude.trim()
    ) {
      alert("Please fill all site details.");
      return;
    }

    const site = {
      name: newSite.name.trim(),
      latitude: newSite.latitude.trim(),
      longitude: newSite.longitude.trim(),
      status: "Active",
    };

    setSites((previousSites) => [
      ...previousSites,
      site,
    ]);

    setNewSite({
      name: "",
      latitude: "",
      longitude: "",
    });

    setShowSiteForm(false);
  };

  const styles = {
    app: {
      minHeight: "100vh",
      display: "flex",
      fontFamily: "Arial, Helvetica, sans-serif",
      background: darkMode ? "#101815" : "#f4f7f5",
      color: darkMode ? "#f5f5f5" : "#17201b",
    },

    loginPage: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, #06291c 0%, #0d4a2f 50%, #06291c 100%)",
      fontFamily: "Arial, Helvetica, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },

    loginCard: {
      width: "390px",
      maxWidth: "100%",
      background: "#ffffff",
      padding: "38px",
      borderRadius: "18px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
      textAlign: "center",
      boxSizing: "border-box",
    },

    logo: {
      width: "58px",
      height: "58px",
      borderRadius: "50%",
      background: "#1fb65b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      margin: "0 auto 15px",
    },

    title: {
      margin: "0",
      fontSize: "27px",
      fontWeight: "700",
      color: "#173b29",
    },

    subtitle: {
      margin: "8px 0 25px",
      color: "#777",
      fontSize: "14px",
    },

    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "14px",
      marginBottom: "14px",
      border: "1px solid #d7ded9",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },

    primaryButton: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "8px",
      background: "#22b957",
      color: "#ffffff",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
    },

    sidebar: {
      width: "245px",
      minHeight: "100vh",
      background: darkMode ? "#07130e" : "#062a1c",
      color: "#ffffff",
      padding: "25px 18px",
      boxSizing: "border-box",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
    },

    brand: {
      fontSize: "21px",
      fontWeight: "700",
      marginBottom: "45px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    brandIcon: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "#28b963",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },

    menuTitle: {
      fontSize: "11px",
      color: "#9cb4a7",
      margin: "0 0 12px 12px",
      letterSpacing: "1px",
    },

    menuItem: {
      padding: "13px 14px",
      borderRadius: "9px",
      marginBottom: "7px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    activeMenu: {
      background: "#239a58",
    },

    logout: {
      position: "absolute",
      bottom: "25px",
      left: "18px",
      right: "18px",
      padding: "13px 14px",
      borderRadius: "9px",
      cursor: "pointer",
      color: "#ffffff",
      background: "rgba(255,255,255,0.06)",
    },

    main: {
      marginLeft: "245px",
      width: "calc(100% - 245px)",
      minHeight: "100vh",
      padding: "32px",
      boxSizing: "border-box",
    },

    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
      gap: "20px",
    },

    welcome: {
      fontSize: "25px",
      fontWeight: "600",
      margin: 0,
    },

    user: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
    },

    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#30b965",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "18px",
      marginBottom: "22px",
    },

    card: {
      background: darkMode ? "#18231e" : "#ffffff",
      borderRadius: "14px",
      padding: "22px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
    },

    cardIcon: {
      fontSize: "25px",
      marginBottom: "13px",
    },

    cardLabel: {
      fontSize: "14px",
      color: darkMode ? "#c5ccc8" : "#777",
      marginBottom: "8px",
    },

    cardValue: {
      fontSize: "24px",
      fontWeight: "700",
    },

    sectionGrid: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: "20px",
    },

    section: {
      background: darkMode ? "#18231e" : "#ffffff",
      borderRadius: "14px",
      padding: "25px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
      marginBottom: "20px",
      boxSizing: "border-box",
    },

    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      gap: "15px",
    },

    sectionTitle: {
      fontSize: "20px",
      fontWeight: "700",
      margin: 0,
    },

    smallText: {
      color: darkMode ? "#c5ccc8" : "#777",
      fontSize: "14px",
      marginTop: "7px",
    },

    greenButton: {
      border: "none",
      background: "#22b957",
      color: "#ffffff",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },

    tableWrapper: {
      width: "100%",
      overflowX: "auto",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      textAlign: "left",
      padding: "12px 8px",
      fontSize: "12px",
      color: darkMode ? "#b8c2bc" : "#777",
      borderBottom: "1px solid #dce3df",
    },

    td: {
      padding: "15px 8px",
      fontSize: "13px",
      borderBottom: "1px solid #e7ece9",
    },

    badge: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "20px",
      background: "#dff5e6",
      color: "#16853d",
      fontSize: "12px",
      fontWeight: "600",
    },

    planningBadge: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "20px",
      background: "#fff0c9",
      color: "#986d00",
      fontSize: "12px",
      fontWeight: "600",
    },

    chart: {
      height: "210px",
      display: "flex",
      alignItems: "flex-end",
      gap: "14px",
      padding: "15px 5px",
      borderBottom: "1px solid #ddd",
      boxSizing: "border-box",
    },

    bar: {
      flex: 1,
      background: "#32b867",
      borderRadius: "6px 6px 0 0",
      minWidth: "18px",
    },

    months: {
      display: "flex",
      justifyContent: "space-around",
      fontSize: "11px",
      color: "#777",
      marginTop: "8px",
    },

    map: {
      height: "280px",
      borderRadius: "12px",
      background:
        "linear-gradient(135deg, #dceee4, #f4f8f5)",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #d6e2da",
    },

    pin: {
      position: "absolute",
      fontSize: "25px",
    },

    formBox: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "12px",
      background: darkMode ? "#101a15" : "#f4f7f5",
    },

    settingRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 0",
      borderBottom: "1px solid #dfe6e2",
      gap: "20px",
    },

    switch: {
      width: "50px",
      height: "26px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      background: "#aaa",
      position: "relative",
      flexShrink: 0,
    },

    switchOn: {
      background: "#22b957",
    },

    switchCircle: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#ffffff",
      position: "absolute",
      top: "3px",
      left: "3px",
      transition: "left 0.2s",
    },

    switchCircleOn: {
      left: "27px",
    },

    formButtonRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },

    secondaryButton: {
      border: "1px solid #ccd7d0",
      background: darkMode ? "#18231e" : "#ffffff",
      color: darkMode ? "#ffffff" : "#17201b",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  if (!loggedIn) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <div style={styles.logo}>🌍</div>

          <h1 style={styles.title}>Darukaa.Earth</h1>

          <p style={styles.subtitle}>
            Geospatial Carbon & Biodiversity Platform
          </p>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />

          <button
            type="button"
            style={styles.primaryButton}
            onClick={login}
          >
            Login
          </button>

          <p
            style={{
              color: "#888",
              fontSize: "12px",
              marginTop: "16px",
            }}
          >
            Demo account • Click Login to continue
          </p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <>
      <div style={styles.topBar}>
        <h1 style={styles.welcome}>
          Welcome back, Administrator
        </h1>

        <div style={styles.user}>
          <div style={styles.avatar}>A</div>
          <span>Administrator</span>
          <small style={{ color: "#777" }}>Admin</small>
        </div>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🌱</div>
          <div style={styles.cardLabel}>Total Projects</div>
          <div style={styles.cardValue}>{projects.length}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📍</div>
          <div style={styles.cardLabel}>Total Sites</div>
          <div style={styles.cardValue}>{sites.length}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🌳</div>
          <div style={styles.cardLabel}>Total Area</div>
          <div style={styles.cardValue}>26,490 ha</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>♻️</div>
          <div style={styles.cardLabel}>Carbon Stored</div>
          <div style={styles.cardValue}>18.6K</div>
        </div>
      </div>

      <div style={styles.sectionGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                Project Overview
              </h2>

              <div style={styles.smallText}>
                Active carbon & biodiversity projects
              </div>
            </div>

            <button
              style={styles.greenButton}
              type="button"
              onClick={() => {
                setPage("Projects");
                setShowProjectForm(true);
              }}
            >
              + New Project
            </button>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>PROJECT</th>
                  <th style={styles.th}>LOCATION</th>
                  <th style={styles.th}>SITES</th>
                  <th style={styles.th}>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {projects.slice(0, 3).map((project) => (
                  <tr key={project.name}>
                    <td style={styles.td}>
                      <strong>{project.name}</strong>
                    </td>

                    <td style={styles.td}>
                      {project.location}
                    </td>

                    <td style={styles.td}>
                      {project.sites}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={
                          project.status === "Planning"
                            ? styles.planningBadge
                            : styles.badge
                        }
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Carbon Performance
          </h2>

          <div style={styles.smallText}>
            Estimated carbon storage
          </div>

          <div style={styles.chart}>
            {[55, 80, 68, 105, 92, 118, 135].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.bar,
                    height: `${height}px`,
                  }}
                />
              )
            )}
          </div>

          <div style={styles.months}>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Geospatial Project Map
        </h2>

        <div style={styles.smallText}>
          Project locations and monitoring sites
        </div>

        <div style={styles.map}>
          <span
            style={{
              ...styles.pin,
              top: "28%",
              left: "25%",
            }}
          >
            📍
          </span>

          <span
            style={{
              ...styles.pin,
              top: "43%",
              left: "47%",
            }}
          >
            📍
          </span>

          <span
            style={{
              ...styles.pin,
              top: "25%",
              left: "65%",
            }}
          >
            📍
          </span>

          <span
            style={{
              ...styles.pin,
              top: "58%",
              left: "75%",
            }}
          >
            📍
          </span>
        </div>
      </div>
    </>
  );

  const renderProjects = () => (
    <>
      <div style={styles.topBar}>
        <h1 style={styles.welcome}>All Projects</h1>

        <button
          type="button"
          style={styles.greenButton}
          onClick={() =>
            setShowProjectForm(!showProjectForm)
          }
        >
          + Create Project
        </button>
      </div>

      <div style={styles.smallText}>
        Manage your carbon and biodiversity projects
      </div>

      {showProjectForm && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Create New Project
          </h2>

          <div style={styles.formBox}>
            <input
              style={styles.input}
              placeholder="Project name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  name: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              placeholder="Location"
              value={newProject.location}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  location: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              placeholder="Area e.g. 5000 ha"
              value={newProject.area}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  area: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              type="number"
              placeholder="Number of sites"
              value={newProject.sites}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  sites: e.target.value,
                })
              }
            />

            <div style={styles.formButtonRow}>
              <button
                type="button"
                style={styles.greenButton}
                onClick={createProject}
              >
                Save Project
              </button>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setShowProjectForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {projects.map((project) => (
          <div style={styles.section} key={project.name}>
            <div style={{ fontSize: "30px" }}>🌳</div>

            <h2 style={{ marginBottom: "12px" }}>
              {project.name}
            </h2>

            <p style={styles.smallText}>
              📍 {project.location}
            </p>

            <p>
              <strong>Area:</strong> {project.area}
            </p>

            <p>
              <strong>Sites:</strong> {project.sites}
            </p>

            <span
              style={
                project.status === "Planning"
                  ? styles.planningBadge
                  : styles.badge
              }
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  const renderSites = () => (
    <>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.welcome}>
            Monitoring Sites
          </h1>

          <div style={styles.smallText}>
            Geographical sites across projects
          </div>
        </div>

        <button
          type="button"
          style={styles.greenButton}
          onClick={() => setShowSiteForm(!showSiteForm)}
        >
          + Add Site
        </button>
      </div>

      {showSiteForm && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Add Monitoring Site
          </h2>

          <div style={styles.formBox}>
            <input
              style={styles.input}
              placeholder="Site name"
              value={newSite.name}
              onChange={(e) =>
                setNewSite({
                  ...newSite,
                  name: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              placeholder="Latitude"
              value={newSite.latitude}
              onChange={(e) =>
                setNewSite({
                  ...newSite,
                  latitude: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              placeholder="Longitude"
              value={newSite.longitude}
              onChange={(e) =>
                setNewSite({
                  ...newSite,
                  longitude: e.target.value,
                })
              }
            />

            <div style={styles.formButtonRow}>
              <button
                type="button"
                style={styles.greenButton}
                onClick={addSite}
              >
                Save Site
              </button>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setShowSiteForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Project Locations
        </h2>

        <div style={styles.map}>
          {sites.map((site, index) => (
            <span
              key={site.name}
              title={site.name}
              style={{
                ...styles.pin,
                top: `${20 + (index * 17) % 60}%`,
                left: `${18 + (index * 21) % 70}%`,
              }}
            >
              📍
            </span>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Monitoring Sites
        </h2>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>SITE</th>
                <th style={styles.th}>LATITUDE</th>
                <th style={styles.th}>LONGITUDE</th>
                <th style={styles.th}>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {sites.map((site) => (
                <tr key={site.name}>
                  <td style={styles.td}>
                    <strong>{site.name}</strong>
                  </td>

                  <td style={styles.td}>
                    {site.latitude}
                  </td>

                  <td style={styles.td}>
                    {site.longitude}
                  </td>

                  <td style={styles.td}>
                    <span style={styles.badge}>
                      {site.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.welcome}>Analytics</h1>

          <div style={styles.smallText}>
            Project performance over time
          </div>
        </div>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>♻️</div>
          <div style={styles.cardLabel}>
            Carbon Stored
          </div>
          <div style={styles.cardValue}>18.6K</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🦋</div>
          <div style={styles.cardLabel}>
            Biodiversity Index
          </div>
          <div style={styles.cardValue}>82.4%</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🌲</div>
          <div style={styles.cardLabel}>
            Forest Coverage
          </div>
          <div style={styles.cardValue}>76.8%</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📍</div>
          <div style={styles.cardLabel}>
            Monitoring Sites
          </div>
          <div style={styles.cardValue}>
            {sites.length}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Performance Analytics
        </h2>

        <div style={styles.smallText}>
          Project performance over time
        </div>

        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            position: "relative",
            borderBottom: "1px solid #ddd",
          }}
        >
          <svg
            width="100%"
            height="250"
            viewBox="0 0 800 250"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,190 120,160 240,170 360,125 480,145 600,90 800,55"
              fill="none"
              stroke="#249b59"
              strokeWidth="4"
            />

            <polyline
              points="0,150 120,175 240,150 360,185 480,170 600,205 800,220"
              fill="none"
              stroke="#6b8d7b"
              strokeWidth="3"
            />
          </svg>
        </div>

        <h3>Carbon storage trend</h3>

        <p style={styles.smallText}>
          +18.7% compared with previous period
        </p>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.welcome}>Settings</h1>

          <div style={styles.smallText}>
            Manage your account and application preferences
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Account Settings
        </h2>

        <div style={styles.settingRow}>
          <div>
            <strong>Administrator Account</strong>

            <div style={styles.smallText}>
              admin@darukaa.earth
            </div>
          </div>

          <span style={styles.badge}>Active</span>
        </div>

        <div style={styles.settingRow}>
          <div>
            <strong>Notifications</strong>

            <div style={styles.smallText}>
              Receive application notifications
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle notifications"
            style={{
              ...styles.switch,
              ...(notifications
                ? styles.switchOn
                : {}),
            }}
            onClick={() =>
              setNotifications((value) => !value)
            }
          >
            <span
              style={{
                ...styles.switchCircle,
                ...(notifications
                  ? styles.switchCircleOn
                  : {}),
              }}
            />
          </button>
        </div>

        <div style={styles.settingRow}>
          <div>
            <strong>Dark Mode</strong>

            <div style={styles.smallText}>
              Change application appearance
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle dark mode"
            style={{
              ...styles.switch,
              ...(darkMode ? styles.switchOn : {}),
            }}
            onClick={() =>
              setDarkMode((value) => !value)
            }
          >
            <span
              style={{
                ...styles.switchCircle,
                ...(darkMode
                  ? styles.switchCircleOn
                  : {}),
              }}
            />
          </button>
        </div>

        <div style={styles.settingRow}>
          <div>
            <strong>Language</strong>

            <div style={styles.smallText}>
              Application language
            </div>
          </div>

          <select
            defaultValue="English"
            style={{
              padding: "9px 15px",
              borderRadius: "7px",
              border: "1px solid #ccd7d0",
            }}
          >
            <option>English</option>
            <option>Kannada</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          System Information
        </h2>

        <div style={styles.settingRow}>
          <span>Platform</span>
          <strong>Darukaa.Earth</strong>
        </div>

        <div style={styles.settingRow}>
          <span>Application Version</span>
          <strong>1.0.0</strong>
        </div>

        <div style={styles.settingRow}>
          <span>Projects</span>
          <strong>{projects.length}</strong>
        </div>

        <div
          style={{
            ...styles.settingRow,
            borderBottom: "none",
          }}
        >
          <span>Monitoring Sites</span>
          <strong>{sites.length}</strong>
        </div>
      </div>
    </>
  );

  const renderPage = () => {
    if (page === "Dashboard") {
      return renderDashboard();
    }

    if (page === "Projects") {
      return renderProjects();
    }

    if (page === "Sites") {
      return renderSites();
    }

    if (page === "Analytics") {
      return renderAnalytics();
    }

    if (page === "Settings") {
      return renderSettings();
    }

    return renderDashboard();
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
    },
    {
      name: "Projects",
      icon: "🌱",
    },
    {
      name: "Sites",
      icon: "📍",
    },
    {
      name: "Analytics",
      icon: "📈",
    },
    {
      name: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>🌍</div>
          <span>Darukaa.Earth</span>
        </div>

        <div style={styles.menuTitle}>
          MAIN MENU
        </div>

        {menuItems.map((item) => (
          <div
            key={item.name}
            style={{
              ...styles.menuItem,
              ...(page === item.name
                ? styles.activeMenu
                : {}),
            }}
            onClick={() => {
              setPage(item.name);

              if (item.name !== "Projects") {
                setShowProjectForm(false);
              }

              if (item.name !== "Sites") {
                setShowSiteForm(false);
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}

        <div
          style={styles.logout}
          onClick={logout}
        >
          🚪 &nbsp; Logout
        </div>
      </aside>

      <main style={styles.main}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;