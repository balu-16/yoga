import { useState, useEffect } from 'react'
import './App.css'
import neoDrapeSetsImg from './assets/neo-drape-sets.svg'
import flowWearImg from './assets/flow-wear.svg'
import festiveEditsImg from './assets/festive-edits.svg'
import morningResetImg from './assets/morning-reset.svg'
import deepSleepImg from './assets/deep-sleep.svg'
import festivalStoriesImg from './assets/festival-stories.svg'
import sevenDayBreathImg from './assets/7-day-breath.svg'
import calmCommuteImg from './assets/calm-commute.svg'
import sleepRitualsImg from './assets/sleep-rituals.svg'
import festivalNotesImg from './assets/festival-notes.svg'
import teacherTalksImg from './assets/teacher-talks.svg'
import mantraMinisImg from './assets/mantra-minis.svg'

function App() {
  const [activeTab, setActiveTab] = useState('lotus')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('lotus-mode') || 'dark'
    setIsDarkMode(savedMode === 'dark')
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('lotus-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const interest = formData.get('interest');
    
    try {
      const response = await fetch('https://yoga-backend-rose.vercel.app/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, interest }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Welcome to the waitlist! You\'ll be the first to know about new drops and exclusive access.');
        e.target.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const interest = formData.get('interest');
    const message = formData.get('message');
    
    try {
      const response = await fetch('https://yoga-backend-rose.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, interest, message }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Thank you for your message! We will reply within 24 hours.');
        e.target.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="app-wrapper">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-inner">
          <div className="brand-mobile">
            <div className="logo" aria-hidden="true"></div>
            <div>
              <h1>Lotus • Yoga • Studio</h1>
              <small>Next‑Gen Lifestyle by <strong>Lavanya</strong> — Brisbane</small>
            </div>
          </div>
          <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="nav desktop-nav">
        <div className="nav-inner container">
          <div className="brand">
            <div className="logo" aria-hidden="true"></div>
            <div>
              <h1>Lotus • Yoga • Studio</h1>
              <small>Next‑Gen Lifestyle by <strong>Lavanya</strong> — Brisbane</small>
            </div>
          </div>
          <nav>
            <a href="#lotus">Lotus</a>
            <a href="#yoga">Yoga</a>
            <a href="#studio">Studio</a>
            <a href="#trend">Trend Lab</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="toggle">
            <div className="theme-toggle" onClick={toggleMode}>
              <div className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="toggle-slider">
                  <span className="toggle-icon">
                    {isDarkMode ? '🌙' : '☀️'}
                  </span>
                </div>
              </div>
            </div>
            <a className="btn primary" href="#waitlist">Join Waitlist</a>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar - Centered Modal */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h3>Menu</h3>
            <button className="sidebar-close" onClick={closeSidebar} aria-label="Close menu">
              ✕
            </button>
          </div>
          <nav className="sidebar-nav">
            <a href="#lotus" onClick={closeSidebar}>Lotus</a>
            <a href="#yoga" onClick={closeSidebar}>Yoga</a>
            <a href="#studio" onClick={closeSidebar}>Studio</a>
            <a href="#trend" onClick={closeSidebar}>Trend Lab</a>
            <a href="#contact" onClick={closeSidebar}>Contact</a>
          </nav>
          <div className="sidebar-actions">
            <div className="theme-toggle sidebar-theme-toggle" onClick={toggleMode}>
              <div className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="toggle-slider">
                  <span className="toggle-icon">
                    {isDarkMode ? '🌙' : '☀️'}
                  </span>
                </div>
              </div>
            </div>
            <a className="btn primary" href="#waitlist" onClick={closeSidebar}>Join Waitlist</a>
          </div>
        </div>
      </aside>

      <section className="hero">
        <div className="orb"></div>
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><span className="pulse"></span> Built for future‑minded creators</span>
            <h2>Outer style. Inner strength. <span style={{background:'linear-gradient(90deg,#8b5cf6,#22c55e,#f59e0b)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Creative mind.</span></h2>
            <p>One ecosystem, three paths: <strong>Lotus</strong> (limited‑drop clothing), <strong>Yoga</strong> (precision 1:1 with Lavanya), and <strong>Studio</strong> (mindful music & podcasts). Designed to inspire today—and trend with tomorrow.</p>
            <div className="chips">
              <span className="chip">Limited Drops</span>
              <span className="chip">Posture Correction</span>
              <span className="chip">Therapeutic Yoga</span>
              <span className="chip">Guided Meditations</span>
              <span className="chip">Creator Collabs</span>
            </div>
            <div className="cta-bar">
              <a className="btn primary" href="#yoga">Book with Lavanya</a>
              <a className="btn primary" href="#lotus">Shop the Lotus Look</a>
              <a className="btn primary" href="#studio">Play Studio</a>
              <span className="badge">Gen‑Z & family‑friendly</span>
            </div>
          </div>
          <div className="kinetic">
            <div className="section-title">
              <h2 style={{fontSize:'20px',margin:'0'}}>Three Pillars</h2>
              <span className="badge">Trending + Timeless</span>
            </div>
            <div className="tabs">
              <div 
                className={`tab ${activeTab === 'lotus' ? 'active' : ''}`} 
                data-kind="lotus"
                onClick={() => handleTabClick('lotus')}
              >
                Lotus — Boutique
              </div>
              <div 
                className={`tab ${activeTab === 'yoga' ? 'active' : ''}`} 
                data-kind="yoga"
                onClick={() => handleTabClick('yoga')}
              >
                Yoga — Expertise
              </div>
              <div 
                className={`tab ${activeTab === 'studio' ? 'active' : ''}`} 
                data-kind="studio"
                onClick={() => handleTabClick('studio')}
              >
                Studio — Audio
              </div>
            </div>
            <div id="panel-lotus" className={`panel ${activeTab === 'lotus' ? 'active' : ''}`}>
              <span className="tag lotus">Lotus</span>
              <h3>Limited‑drop clothing for movement & culture</h3>
              <p className="muted">Custom fits, festival edits, and stretch‑friendly sets. Appointment‑based + pre‑orders to reduce waste.</p>
              <div className="gallery" id="shop">
                <div className="tile">
                  <img src={neoDrapeSetsImg} alt="Neo-Drape Sets" />
                  <span>Neo‑Drape Sets</span>
                </div>
                <div className="tile">
                  <img src={flowWearImg} alt="Flow Wear" />
                  <span>Flow Wear</span>
                </div>
                <div className="tile">
                  <img src={festiveEditsImg} alt="Festive Edits" />
                  <span>Festive Edits</span>
                </div>
              </div>
              <div className="cta-bar">
                <a className="btn" href="#waitlist">Join Drop Waitlist</a>
                <a className="btn ghost" href="#lotus">Lookbook</a>
              </div>
            </div>
            <div id="panel-yoga" className={`panel ${activeTab === 'yoga' ? 'active' : ''}`}>
              <span className="tag yoga">Yoga</span>
              <h3>Expert 1:1—not regular classes</h3>
              <p className="muted">18+ yrs practice • 9+ yrs teaching • Master's in Yogic Science • Rishikesh 200‑Hour TTC.</p>
              <div className="grid-3">
                <div className="card"><strong>Online (45m)</strong><p className="muted">A$32 • posture, pranayama, meditation</p></div>
                <div className="card"><strong>In‑person (45m)</strong><p className="muted">A$45 + transport • Brisbane</p></div>
                <div className="card"><strong>Teacher Collabs</strong><p className="muted">Workshops & posture labs</p></div>
              </div>
              <div className="cta-bar">
                <a className="btn primary" href="#contact">Request Session</a>
                <a className="btn ghost" href="#yoga">Focus Areas</a>
              </div>
            </div>
            <div id="panel-studio" className={`panel ${activeTab === 'studio' ? 'active' : ''}`}>
              <span className="tag studio">Studio</span>
              <h3>Mindful audio that fits your day</h3>
              <p className="muted">Guided meditations, mantra loops, cultural stories. Launching on YouTube & Spotify.</p>
              <div className="gallery">
                <div className="tile">
                  <img src={morningResetImg} alt="Morning Reset" />
                  <span>Morning Reset</span>
                </div>
                <div className="tile">
                  <img src={deepSleepImg} alt="Deep Sleep" />
                  <span>Deep Sleep</span>
                </div>
                <div className="tile">
                  <img src={festivalStoriesImg} alt="Festival Stories" />
                  <span>Festival Stories</span>
                </div>
              </div>
              <div className="cta-bar">
                <a className="btn" href="#studio">Follow the Channel</a>
                <a className="btn primary" href="#contact">Pitch a Collab</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trend">
        <div className="container split">
          <div>
            <div className="section-title">
              <h2>Trend Lab — Built for Future Generations</h2>
              <span className="badge">Sustainable • Inclusive • Digital‑native</span>
            </div>
            <div className="list">
              <div className="li"><div className="dot brand"></div><div><strong>Limited drops & pre‑orders</strong> to end overproduction and keep pieces exclusive.</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Creator program</strong> with UGC features, affiliate perks, and collab capsules.</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Wellbeing‑first design</strong> across clothing, practice, and audio for daily routines.</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Community pledge:</strong> youth mentorships, women‑led operations, and cultural storytelling.</div></div>
            </div>
            <div className="cta-bar" style={{marginTop:'12px'}}>
              <a className="btn primary" href="#waitlist">Join Creator Waitlist</a>
              <span className="badge">Early‑access codes every drop</span>
            </div>
          </div>
          <div className="card">
            <h3 style={{marginTop:'0'}}>Sustainability Snapshot</h3>
            <div className="list">
              <div className="li"><div className="dot brand"></div><div>Organic & deadstock fabrics when possible</div></div>
              <div className="li"><div className="dot brand"></div><div>Small‑batch making, fair pay to artisans</div></div>
              <div className="li"><div className="dot brand"></div><div>Repair & recycle program (coming soon)</div></div>
            </div>
            <p className="badge" style={{display:'inline-block',marginTop:'10px'}}>Zero pressure • Pure purpose</p>
          </div>
        </div>
      </section>

      <section id="lotus">
        <div className="container">
          <div className="section-title">
            <h2>Lotus — Limited‑Drop Boutique</h2>
            <span className="badge">Pre‑order • Custom fit • Festival edits</span>
          </div>
          <div className="grid-3">
            <div className="card">
              <span className="tag lotus">Drop 01</span>
              <h3>Neo‑Drape Capsule</h3>
              <p className="muted">Fluid silhouettes for practice & evenings.</p>
            </div>
            <div className="card">
              <span className="tag lotus">Drop 02</span>
              <h3>Flow Wear</h3>
              <p className="muted">Stretch sets engineered for movement.</p>
            </div>
            <div className="card">
              <span className="tag lotus">Drop 03</span>
              <h3>Festive Edit</h3>
              <p className="muted">Seasonal culture‑first collections.</p>
            </div>
          </div>
          <div className="cta-bar" style={{marginTop:'12px'}}>
            <a className="btn primary" href="#waitlist">Get Early Access</a>
            <a className="btn" href="#contact">Request Lookbook</a>
          </div>
        </div>
      </section>

      <section id="yoga">
        <div className="container split">
          <div>
            <div className="section-title">
              <h2>Lavanya's Focus</h2>
              <span className="badge yoga">Precision‑based, therapeutic 1:1</span>
            </div>
            <div className="card">
              <div className="list">
                <div className="li"><div className="dot accent"></div><div>Posture correction & alignment (students + teachers)</div></div>
                <div className="li"><div className="dot accent"></div><div>PCOD/PCOS, thyroid, diabetes & weight management support</div></div>
                <div className="li"><div className="dot accent"></div><div>Pranayama, meditation (beginner → advanced)</div></div>
                <div className="li"><div className="dot accent"></div><div>Stress/anxiety relief & sleep protocols</div></div>
              </div>
              <div className="cta-bar" style={{marginTop:'12px'}}>
                <a className="btn primary" href="#contact">Book a Session</a>
                <a className="btn ghost" href="#yoga">See Pricing</a>
              </div>
            </div>
          </div>
          <div>
            <div className="section-title">
              <h2>Guided by Experience</h2>
              <span className="badge">18+ yrs practice • 9+ yrs teaching</span>
            </div>
            <div className="grid-3">
              <div className="card"><strong>Online (45m)</strong><p className="muted">A$32 • global video consult</p></div>
              <div className="card"><strong>In‑person (45m)</strong><p className="muted">A$45 + transport • Brisbane</p></div>
              <div className="card"><strong>Teacher Labs</strong><p className="muted">Technique & posture clinics</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio">
        <div className="container split">
          <div>
            <div className="section-title">
              <h2>Studio — Music & Podcasts</h2>
              <span className="badge">Guided • Grounded • Groovy</span>
            </div>
            <p>From morning focus to deep sleep, from mantra loops to festival stories—our audio is minimal, mindful, and made for daily life. Subscribe and journey with us.</p>
            <div className="cta-bar">
              <a className="btn primary" href="https://youtube.com" target="_blank" rel="noopener">YouTube</a>
              <a className="btn primary" href="https://spotify.com" target="_blank" rel="noopener">Spotify</a>
              <a className="btn primary" href="#contact">Creator Collab</a>
            </div>
          </div>
          <div className="card">
            <h3 style={{marginTop:'0'}}>Upcoming Series</h3>
            <div className="gallery">
              <div className="tile">
                <img src={sevenDayBreathImg} alt="7-Day Breath" />
                <span>7‑Day Breath</span>
              </div>
              <div className="tile">
                <img src={calmCommuteImg} alt="Calm Commute" />
                <span>Calm Commute</span>
              </div>
              <div className="tile">
                <img src={sleepRitualsImg} alt="Sleep Rituals" />
                <span>Sleep Rituals</span>
              </div>
              <div className="tile">
                <img src={festivalNotesImg} alt="Festival Notes" />
                <span>Festival Notes</span>
              </div>
              <div className="tile">
                <img src={teacherTalksImg} alt="Teacher Talks" />
                <span>Teacher Talks</span>
              </div>
              <div className="tile">
                <img src={mantraMinisImg} alt="Mantra Minis" />
                <span>Mantra Minis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social-proof">
        <div className="container">
          <div className="section-title">
            <h2>What the community says</h2>
            <span className="badge">Real words • Real change</span>
          </div>
          <div className="quotes">
            <blockquote>
              <p>"Lavanya fixed my posture in 3 sessions—my back has never felt better."</p>
              <footer>— Asha, Brisbane</footer>
            </blockquote>
            <blockquote>
              <p>"The Lotus pieces move with you. I wore them from mat to meetup."</p>
              <footer>— Neha, Melbourne</footer>
            </blockquote>
            <blockquote>
              <p>"I loop 'Deep Sleep' every night. Instant calm."</p>
              <footer>— Rahul, Sydney</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="waitlist">
        <div className="container split">
          <div>
            <div className="section-title">
              <h2>Join the Waitlist</h2>
              <span className="badge">Early drops • Priority booking • Giveaways</span>
            </div>
            <p>Be first to access limited clothing drops, private yoga slots, and Studio premieres. We'll email only when it matters.</p>
            <form className="card" onSubmit={handleWaitlistSubmit}>
              <div className="list">
                <input required type="text" name="name" placeholder="Full name" />
                <input required type="email" name="email" placeholder="Email address" />
                <select required name="interest">
                  <option value="">I'm most into…</option>
                  <option value="lotus">Lotus — Clothing Drops</option>
                  <option value="yoga">Yoga — 1:1 with Lavanya</option>
                  <option value="studio">Studio — Music & Podcasts</option>
                  <option value="all">All of it!</option>
                </select>
                <button className="btn primary" type="submit">Get Early Access</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3 style={{marginTop:'0'}}>Creator Program</h3>
            <p>Creators, teachers, musicians—build with us. Get capsule collabs, revenue share, and shout‑outs.</p>
            <ul className="list" style={{margin:'0 0 12px 0'}}>
              <li>UGC features on socials</li>
              <li>Affiliate codes and drops</li>
              <li>Co‑branded workshops & playlists</li>
            </ul>
            <a className="btn primary" href="#contact">Pitch a collab</a>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container split">
          <div>
            <div className="section-title">
              <h2>Contact & Bookings</h2>
              <span className="badge">Trusted • Familiar • Community‑first</span>
            </div>
            <p><strong>Email:</strong> <a href="mailto:care.lotusyoga@gmail.com">care.lotusyoga@gmail.com</a> &nbsp; | &nbsp; <strong>Phone/WhatsApp:</strong> <a href="tel:+61438144768">+61 438 144 768</a></p>
            <form onSubmit={handleContactSubmit}>
              <div className="form-row">
                <input required name="name" placeholder="Full name" />
                <input required type="email" name="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <select required name="interest">
                  <option value="">I'm interested in…</option>
                  <option value="yoga-online">Yoga — 1:1 Online</option>
                  <option value="yoga-inperson">Yoga — In‑person (Brisbane)</option>
                  <option value="lotus">Lotus — Clothing / Lookbook</option>
                  <option value="studio">Studio — Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea rows="5" name="message" placeholder="Share your goals or request (optional)"></textarea>
              </div>
              <div className="cta-bar">
                <button className="btn primary" type="submit">Send request</button>
                <span className="badge">Reply in ~24 hrs</span>
              </div>
            </form>
          </div>
          <div className="card">
            <h3 style={{marginTop:'0'}}>Why choose us</h3>
            <div className="list">
              <div className="li"><div className="dot brand"></div><div><strong>Trust:</strong> transparent pricing & clear outcomes</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Urgency:</strong> limited 1:1 slots; small‑batch drops</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Consensus:</strong> community‑driven collabs</div></div>
              <div className="li"><div className="dot brand"></div><div><strong>Familiarity:</strong> Brisbane‑based with global online reach</div></div>
            </div>
            <p className="badge" style={{display:'inline-block',marginTop:'10px'}}>By appointment • Purpose over pressure</p>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="container">
          <div className="brand">
            <div className="logo" aria-hidden="true"></div>
            <div>
              <h1 style={{fontSize:'18px',margin:'0'}}>Lotus • Yoga • Studio</h1>
              <small>One ecosystem. Three paths.</small>
            </div>
          </div>
          <p style={{marginTop:'12px',color:'var(--muted)'}}>Outer style (Lotus), inner strength (Yoga), and mindful audio (Studio) — crafted with care by Lavanya in Brisbane.</p>
          <div className="copyright">
            © {new Date().getFullYear()} Lotus • Yoga • Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
