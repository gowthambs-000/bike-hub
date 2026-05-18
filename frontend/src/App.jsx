import React, { useState } from 'react';
import BikeList from './components/BikeList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Registration Form States
  const [isRegistering, setIsRegistering] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Active Navigation System State
  const [currentView, setCurrentView] = useState('showroom'); // Options: 'showroom' or 'booking_site'

  // Booking Site Form States
  const [bookingBike, setBookingBike] = useState('Ducati Panigale V4S');
  const [bookingDays, setBookingDays] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Mouse Interactive Hover Tracker States
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [hoveredContactCard, setHoveredContactCard] = useState(null);
  const [hoveredInput, setHoveredInput] = useState(null);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isToggleLinkHovered, setIsToggleLinkHovered] = useState(false);
  const [isFetchActionHovered, setIsFetchActionHovered] = useState(false);
  const [isBackBtnHovered, setIsBackBtnHovered] = useState(false);

  // Local System Accounts Storage Array
  const [allowedUsers, setAllowedUsers] = useState([
    { username: 'admin', password: 'password123', role: 'System Administrator' },
    { username: 'manager', password: 'showroom2026', role: 'Showroom Manager' }
  ]);

  // Curated Specific Legendary Bike Image Links
  const legendaryBikes = [
    {
      name: "MV Agusta F4 RR",
      tag: "Motorcycle Art",
      img: "https://www.webbikeworld.com/wp-content/uploads/2021/03/2021-MV-Agusta-F3-800-HERO-1176x588.jpg"
    },
    {
      name: "Kawasaki Ninja ZX-10R",
      tag: "Green Goblin Apex Weapon",
      img: "https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-2-820x1024.jpg"
    },
    {
      name: "Ducati Panigale V4S",
      tag: "Italian Thoroughbred",
      img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "BMW M1000RR",
      tag: "M Power Circuit King",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBEpklEx9ajEpalUtebFX82-L9tFPP4AcNsg&s"
    }
  ];

  // 🚀 FIXED: Integrated Fetch request to stream submissions straight to MongoDB
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please fill out your contact verification fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bikeName: bookingBike,
          rentalDays: parseInt(bookingDays),
          customerName: customerName,
          customerPhone: customerPhone
        })
      });

      const result = await response.json();

      if (result.success) {
        setBookingSubmitted(true);
        // Reset specific text parameter input components
        setCustomerName('');
        setCustomerPhone('');
      } else {
        alert("Database transaction rejected: " + result.error);
      }
    } catch (error) {
      console.error("Network packet failure:", error);
      alert("Could not interface cleanly with the Express server array.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regUsername || !regPassword) {
      setLoginError('Please fill in all registration fields.');
      return;
    }
    const userExists = allowedUsers.some(user => user.username === regUsername.toLowerCase());
    if (userExists) {
      setLoginError('Username already taken. Try another name!');
      return;
    }
    const newUser = {
      username: regUsername.toLowerCase(),
      password: regPassword,
      role: 'Registered Showroom Member'
    };
    setAllowedUsers([...allowedUsers, newUser]);
    setRegSuccess('Account created successfully! You can now log in.');
    setLoginError('');
    setRegUsername('');
    setRegPassword('');
    setIsRegistering(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const matchedUser = allowedUsers.find(
      (user) => user.username === username.toLowerCase() && user.password === password
    );
    if (matchedUser) {
      setIsLoggedIn(true);
      setCurrentUser(matchedUser);
      setLoginError('');
      setRegSuccess('');
    } else {
      setLoginError('Invalid credentials. Double check your spelling or create an account!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentView('showroom');
    setUsername('');
    setPassword('');
  };

  // ==========================================
  // VIEW 1: AUTHENTICATION INTERFACE (GATEWAY)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(51, 65, 85, 0.5)',
          borderRadius: '16px',
          padding: '0 0 35px 0', 
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          overflow: 'hidden' 
        }}>
          <div style={{ width: '100%', height: '170px', marginBottom: '25px', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600" 
              alt="Triumph Street Triple Closeup" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(30, 41, 59, 1), transparent)' }}></div>
          </div>

          <div style={{ padding: '0 40px' }}>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '1.6rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>BIKE RENT HUB</h2>
            <p style={{ margin: '0 0 30px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500' }}>
              {isRegistering ? 'Create Your Showroom Account' : 'Portal Control Panel Authentication'}
            </p>

            {/* Notification Windows */}
            {regSuccess && <p style={{ color: '#34d399', fontSize: '0.85rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)', margin: '0 0 20px 0' }}>{regSuccess}</p>}
            {loginError && <p style={{ color: '#f87171', fontSize: '0.85rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)', margin: '0 0 20px 0' }}>{loginError}</p>}

            {isRegistering ? (
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>CHOOSE USERNAME</label>
                  <input 
                    type="text" placeholder="New username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} 
                    onMouseEnter={() => setHoveredInput('regUser')} onMouseLeave={() => setHoveredInput(null)}
                    style={{ ...inputStyle, border: hoveredInput === 'regUser' ? '1px solid #38bdf8' : '1px solid #475569', boxShadow: hoveredInput === 'regUser' ? '0 0 8px rgba(56, 189, 248, 0.3)' : 'none' }} 
                  />
                </div>
                <div style={{ marginBottom: '25px', textAlign: 'left' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>CREATE PASSWORD</label>
                  <input 
                    type="password" placeholder="New password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} 
                    onMouseEnter={() => setHoveredInput('regPass')} onMouseLeave={() => setHoveredInput(null)}
                    style={{ ...inputStyle, border: hoveredInput === 'regPass' ? '1px solid #38bdf8' : '1px solid #475569', boxShadow: hoveredInput === 'regPass' ? '0 0 8px rgba(56, 189, 248, 0.3)' : 'none' }} 
                  />
                </div>
                <button type="submit" onMouseEnter={() => setIsSubmitHovered(true)} onMouseLeave={() => setIsSubmitHovered(false)} style={{ ...btnStyle, backgroundColor: isSubmitHovered ? '#7dd3fc' : '#38bdf8', transform: isSubmitHovered ? 'scale(1.02)' : 'scale(1)' }}>Register Account</button>
                <p style={{ margin: '20px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>Already have an account? <span onClick={() => { setIsRegistering(false); setLoginError(''); }} onMouseEnter={() => setIsToggleLinkHovered(true)} onMouseLeave={() => setIsToggleLinkHovered(false)} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600', textDecoration: isToggleLinkHovered ? 'underline' : 'none' }}>Log In</span></p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>USERNAME</label>
                  <input 
                    type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} 
                    onMouseEnter={() => setHoveredInput('loginUser')} onMouseLeave={() => setHoveredInput(null)}
                    style={{ ...inputStyle, border: hoveredInput === 'loginUser' ? '1px solid #38bdf8' : '1px solid #475569', boxShadow: hoveredInput === 'loginUser' ? '0 0 8px rgba(56, 189, 248, 0.3)' : 'none' }} 
                  />
                </div>
                <div style={{ marginBottom: '25px', textAlign: 'left' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>PASSWORD</label>
                  <input 
                    type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    onMouseEnter={() => setHoveredInput('loginPass')} onMouseLeave={() => setHoveredInput(null)}
                    style={{ ...inputStyle, border: hoveredInput === 'loginPass' ? '1px solid #38bdf8' : '1px solid #475569', boxShadow: hoveredInput === 'loginPass' ? '0 0 8px rgba(56, 189, 248, 0.3)' : 'none' }} 
                  />
                </div>
                <button type="submit" onMouseEnter={() => setIsSubmitHovered(true)} onMouseLeave={() => setIsSubmitHovered(false)} style={{ ...btnStyle, backgroundColor: isSubmitHovered ? '#7dd3fc' : '#38bdf8', transform: isSubmitHovered ? 'scale(1.02)' : 'scale(1)' }}>Secure Login</button>
                <p style={{ margin: '20px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>New to the hub? <span onClick={() => { setIsRegistering(true); setLoginError(''); setRegSuccess(''); }} onMouseEnter={() => setIsToggleLinkHovered(true)} onMouseLeave={() => setIsToggleLinkHovered(false)} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600', textDecoration: isToggleLinkHovered ? 'underline' : 'none' }}>Create an Account</span></p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED IN VIEWS MANAGEMENT 
  // ==========================================
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: '"Segoe UI", Roboto, sans-serif', margin: '0', padding: '0' }}>
      
      {/* Standard Header Menu Configuration */}
      <header style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', width: '220px' }}>
          Connected as: <strong style={{ color: '#38bdf8' }}>{currentUser.username}</strong><br />
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({currentUser.role})</span>
        </div> 
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '0', fontSize: '2.2rem', fontWeight: '800', letterSpacing: '1px', color: '#38bdf8' }}>BIKE RENT HUB</h1>
          <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>Exotic & Premium Superbike Showroom</p>
        </div>
        <button 
          onClick={handleLogout} onMouseEnter={() => setIsLogoutHovered(true)} onMouseLeave={() => setIsLogoutHovered(false)}
          style={{ backgroundColor: isLogoutHovered ? '#ef4444' : 'transparent', border: isLogoutHovered ? '1px solid #ef4444' : '1px solid #64748b', color: isLogoutHovered ? '#ffffff' : '#94a3b8', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', width: '100px', transition: 'all 0.2s' }}
        >
          Logout
        </button>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* SUBVIEW A: SHOWROOM HUB OVERVIEW CATALOG */}
        {currentView === 'showroom' && (
          <>
            {/* Legendary Pillars Row */}
            <div style={{ marginTop: '20px', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '15px', letterSpacing: '0.5px', borderLeft: '4px solid #38bdf8', paddingLeft: '12px' }}>
                Legendary Showroom Pillars
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {legendaryBikes.map((bike, idx) => (
                  <div 
                    key={idx} onMouseEnter={() => setHoveredPillar(idx)} onMouseLeave={() => setHoveredPillar(null)}
                    style={{ position: 'relative', height: '160px', borderRadius: '12px', overflow: 'hidden', border: hoveredPillar === idx ? '1px solid #38bdf8' : '1px solid #334155', boxShadow: hoveredPillar === idx ? '0 10px 20px rgba(56, 189, 248, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.2)', transform: hoveredPillar === idx ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  >
                    <img src={bike.img} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hoveredPillar === idx ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 20%, rgba(15, 23, 42, 0.2))', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>{bike.name}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600', letterSpacing: '0.5px' }}>{bike.tag.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE BOX: AVAILABLE SHOWROOM FETCH CLICK BUTTON */}
            <div 
              onClick={() => setCurrentView('booking_site')}
              onMouseEnter={() => setIsFetchActionHovered(true)}
              onMouseLeave={() => setIsFetchActionHovered(false)}
              style={{
                backgroundColor: isFetchActionHovered ? 'rgba(56, 189, 248, 0.15)' : '#1e293b',
                border: isFetchActionHovered ? '1px solid #38bdf8' : '1px solid #334155',
                padding: '20px 30px',
                borderRadius: '12px',
                marginBottom: '35px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transform: isFetchActionHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isFetchActionHovered ? '0 8px 20px rgba(56, 189, 248, 0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: isFetchActionHovered ? '#38bdf8' : '#f8fafc', fontSize: '1.2rem', fontWeight: '700' }}>
                  ⚡ Open Showroom Booking Portal
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                  Click to launch the secure live rental reservation page for track superbikes.
                </p>
              </div>
              <span style={{ 
                backgroundColor: '#38bdf8', color: '#0f172a', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700',
                boxShadow: isFetchActionHovered ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none', transition: 'all 0.2s'
              }}>
                Book Now ➔
              </span>
            </div>

            {/* Live Showroom Catalog List Component */}
            <BikeList />
          </>
        )}

        {/* SUBVIEW B: DYNAMIC LIVE BOOKING SITE INTERFACE */}
        {currentView === 'booking_site' && (
          <div style={{ maxWidth: '650px', margin: '40px auto', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* Header Banner */}
            <div style={{ backgroundColor: '#0f172a', padding: '25px 40px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '1.4rem', fontWeight: '800' }}>SECURE RESERVATION DESK</h2>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>Live Showroom Allocation Request</p>
              </div>
              <button 
                onClick={() => { setCurrentView('showroom'); setBookingSubmitted(false); }}
                onMouseEnter={() => setIsBackBtnHovered(true)} onMouseLeave={() => setIsBackBtnHovered(false)}
                style={{ backgroundColor: 'transparent', border: '1px solid #64748b', color: isBackBtnHovered ? '#38bdf8' : '#94a3b8', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8', fontWeight: '600', transition: 'all 0.2s' }}
              >
                🦺 Back
              </button>
            </div>

            {/* Form Container */}
            <div style={{ padding: '40px' }}>
              {bookingSubmitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>✅</div>
                  <h3 style={{ color: '#34d399', fontSize: '1.5rem', margin: '0 0 10px 0' }}>Booking Request Sent!</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '0 0 25px 0', lineHeight: '1.5' }}>
                    Your request for the <strong style={{ color: '#38bdf8' }}>{bookingBike}</strong> for <strong>{bookingDays} Day(s)</strong> has been logged.<br /> Our managers will ring you shortly to verify track delivery clearance.
                  </p>
                  <button onClick={() => { setCurrentView('showroom'); setBookingSubmitted(false); }} style={{ ...btnStyle, backgroundColor: '#38bdf8', width: '200px', color: '#0f172a' }}>Return to Showroom</button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  {/* Select Vehicle */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>SELECT SUPERBIKE TARGET</label>
                    <select value={bookingBike} onChange={(e) => setBookingBike(e.target.value)} style={{ ...inputStyle, border: '1px solid #475569', color: '#f8fafc', padding: '12px' }}>
                      <option value="Ducati Panigale V4S">Ducati Panigale V4S</option>
                      <option value="Kawasaki Ninja ZX-10R">Kawasaki Ninja ZX-10R</option>
                      <option value="MV Agusta F4 RR">MV Agusta F4 RR</option>
                      <option value="BMW M1000RR">BMW M1000RR</option>
                      <option value="MT-09">MT-09</option>
                      <option value="Honda CBR600RR E-Clutch">Honda CBR600RR E-Clutch</option>
                      <option value="Aprilia RSV4 Factory 1100">Aprilia RSV4 Factory 1100</option>
                    </select>
                  </div>

                  {/* Duration Days */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>RENTAL TIME INTERVAL (DAYS)</label>
                    <input type="number" min="1" max="30" value={bookingDays} onChange={(e) => setBookingDays(parseInt(e.target.value))} style={{ ...inputStyle, border: '1px solid #475569', color: '#f8fafc' }} />
                  </div>

                  {/* Customer Name */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>YOUR LEGAL NAME</label>
                    <input type="text" placeholder="Enter full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ ...inputStyle, border: '1px solid #475569', color: '#f8fafc' }} />
                  </div>

                  {/* Customer Contact */}
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>CONTACT MOBILE NUMBER</label>
                    <input type="tel" placeholder="Enter phone number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ ...inputStyle, border: '1px solid #475569', color: '#f8fafc' }} />
                  </div>

                  <button type="submit" onMouseEnter={() => setIsSubmitHovered(true)} onMouseLeave={() => setIsSubmitHovered(false)} style={{ ...btnStyle, backgroundColor: isSubmitHovered ? '#7dd3fc' : '#38bdf8', color: '#0f172a', width: '100%' }}>Confirm Booking Schedule</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Contact & Headquarters Static Panel Desk */}
        <div style={{ marginTop: '50px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8', fontSize: '1.3rem', fontWeight: '700', letterSpacing: '0.5px' }}>Showroom Concierge & Booking Desk</h3>
          <p style={{ margin: '0 0 25px 0', color: '#94a3b8', fontSize: '0.9rem' }}>For instantaneous track allocation, physical inspection clearances, or customized rental pricing grids, please coordinate with our booking managers.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            <div onMouseEnter={() => setHoveredContactCard('desk')} onMouseLeave={() => setHoveredContactCard(null)} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: hoveredContactCard === 'desk' ? '1px solid #38bdf8' : '1px solid #334155', transform: hoveredContactCard === 'desk' ? 'translateY(-2px)' : 'translateY(0)', boxShadow: hoveredContactCard === 'desk' ? '0 4px 12px rgba(56, 189, 248, 0.1)' : 'none', transition: 'all 0.2s ease' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#f8fafc', fontSize: '0.95rem', fontWeight: '700' }}>📞 DIRECT DESK MATRIX</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#cbd5e1' }}><strong style={{ color: '#38bdf8' }}>Showroom Hotline:</strong> +91 9353620566</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#cbd5e1' }}><strong style={{ color: '#38bdf8' }}>VIP Enquiries:</strong> +91 6362105999</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}><strong style={{ color: '#38bdf8' }}>Mail Desk:</strong> booking@bikerenthub.com</p>
            </div>
            <div onMouseEnter={() => setHoveredContactCard('hq')} onMouseLeave={() => setHoveredContactCard(null)} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: hoveredContactCard === 'hq' ? '1px solid #38bdf8' : '1px solid #334155', transform: hoveredContactCard === 'hq' ? 'translateY(-2px)' : 'translateY(0)', boxShadow: hoveredContactCard === 'hq' ? '0 4px 12px rgba(56, 189, 248, 0.1)' : 'none', transition: 'all 0.2s ease' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#f8fafc', fontSize: '0.95rem', fontWeight: '700' }}>📍 PHYSICAL HEADQUARTERS</h4>
              <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '600' }}>Bike Rent Hub Showroom Complex</p>
              <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>77 Apex Circuit Boulevard, <br />Suite 400 - Premium Luxury Block,<br />Jayanagar, Bangalore</p>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>● Showroom Open: 09:00 AM — 09:00 PM EST</span>
            </div>
          </div>
        </div>

        {/* 🔒 Section B: Conditional Admin Account Registry View */}
        {currentUser.username === 'admin' && (
          <div style={{ marginTop: '40px', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#38bdf8', fontSize: '1.3rem', fontWeight: '700' }}>Registered System Accounts Database ({allowedUsers.length})</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '14px' }}>USERNAME</th>
                    <th style={{ padding: '14px' }}>PASSWORD DECRYPT KEY</th>
                    <th style={{ padding: '14px' }}>SYSTEM ROLE ASSIGNMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {allowedUsers.map((user, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #334155', fontSize: '0.95rem' }}>
                      <td style={{ padding: '14px', color: '#f8fafc', fontWeight: '600' }}>{user.username}</td>
                      <td style={{ padding: '14px', color: '#64748b', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{user.password}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(56, 189, 248, 0.2)' }}>{user.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Global Reusable CSS Style Objects
const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: '#0f172a',
  color: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box',
  fontSize: '0.95rem',
  transition: 'all 0.2s ease'
};

const btnStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '8px',
  border: 'none',
  color: '#0f172a',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease'
};

export default App;