import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Showroom from './components/Showroom';
import ClientPortals from './components/ClientPortals';
import BrokersDesk from './components/BrokersDesk';
import HeroSlider from './components/HeroSlider';
import { defaultInventory, mockLeads } from './data/defaultInventory';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Load state from localStorage or fallback to defaults
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('vanguard_inventory');
    return saved ? JSON.parse(saved) : defaultInventory;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('vanguard_leads');
    return saved ? JSON.parse(saved) : mockLeads;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('vanguard_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('vanguard_leads', JSON.stringify(leads));
  }, [leads]);

  // Lead handlers
  const handleInquireSubmit = (inquiryData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      type: 'inquiry',
      ...inquiryData,
      status: 'unread',
      date: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleSellerSubmit = (sellerData) => {
    const newListing = {
      id: `apt-car-${Date.now()}`,
      pendingApproval: true,
      status: 'available',
      image: sellerData.category === 'cars' ? 'porsche' : sellerData.category === 'apartments' ? 'penthouse' : 'watch',
      ...sellerData,
      sellerInfo: {
        name: sellerData.sellerName,
        phone: sellerData.sellerPhone,
        email: sellerData.sellerEmail,
        dateSubmitted: new Date().toISOString().split('T')[0]
      }
    };
    
    setInventory(prev => [newListing, ...prev]);

    // Create notification lead
    const newLead = {
      id: `lead-${Date.now()}`,
      type: 'listing',
      clientName: sellerData.sellerName,
      clientEmail: sellerData.sellerEmail,
      clientPhone: sellerData.sellerPhone,
      details: {
        category: sellerData.category,
        title: sellerData.title,
        description: sellerData.description,
        targetPrice: sellerData.price
      },
      message: `Client submitted listing: "${sellerData.title}" for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(sellerData.price)}. Needs appraisal.`,
      status: 'unread',
      date: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleBuyerSubmit = (buyerData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      type: 'sourcing',
      ...buyerData,
      status: 'unread',
      date: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
  };

  const handleUpdateInventoryStatus = (itemId, newStatus) => {
    setInventory(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item));
  };

  const handleUpdateInventoryDetails = (itemId, updatedDetails) => {
    setInventory(prev => prev.map(item => item.id === itemId ? { ...item, ...updatedDetails } : item));
  };

  const handleApproveListing = (itemId, approvalDetails) => {
    setInventory(prev => prev.map(item => item.id === itemId ? { 
      ...item, 
      ...approvalDetails, 
      pendingApproval: false 
    } : item));
  };

  const handleRejectListing = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const unreadLeadsCount = leads.filter(l => l.status === 'unread').length;

  return (
    <>
      {/* Background Animated Layers (Warm Domira sunlight leaks) */}
      <div className="background-grid"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>

      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadLeadsCount={unreadLeadsCount} 
      />

      {/* Page Content Router */}
      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        {activeTab === 'home' && (
          <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Hero Section */}
            <div className="hero-container">
              {/* Left Column: Core Hero Content */}
              <div>
                <span className="hero-subtitle">Bespoke Acquisition & Disinvestment</span>
                <h1 className="hero-title serif-text" style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', marginBottom: '1.25rem', textAlign: 'left' }}>
                  Your Strategic Partner in <br />
                  High-Value Brokerage
                </h1>
                <p className="hero-description" style={{ margin: '0 0 2rem 0', maxWidth: 'none', textAlign: 'left' }}>
                  We represent discerning clients seeking to buy or sell premium real estate, exotic automobiles, yachts, and luxury collectibles. Leveraging deep network intelligence, we secure transactions with absolute discretion and pricing efficiency.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn-gold" onClick={() => setActiveTab('showroom')}>
                    Explore Showroom
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('client-portal')}>
                    Retain Our Services
                  </button>
                </div>
              </div>

              {/* Right Column: Framed Hero Image Showcase with sliding carousel */}
              <HeroSlider />
            </div>

            {/* Our Services Section */}
            <div style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span className="hero-subtitle">Our Specializations</span>
                <h2 className="serif-text" style={{ fontSize: '2.5rem', color: '#000000', marginTop: '0.5rem', fontWeight: '700' }}>
                  Core Brokerage Verticals
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
              }}>
                {/* Vertical 1 */}
                <div className="glass-panel glass-panel-hover" style={{ padding: '40px', borderRadius: '12px', background: '#ffffff' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '6px',
                    background: 'rgba(74, 92, 104, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(74, 92, 104, 0.15)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h3 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Real Estate & Estates</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65' }}>
                    From cliffside coastal villas and historic manors to sleek downtown skyline penthouses. We manage properties off-market, coordinate inspections, and handle private title transfers.
                  </p>
                </div>

                {/* Vertical 2 */}
                <div className="glass-panel glass-panel-hover" style={{ padding: '40px', borderRadius: '12px', background: '#ffffff' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '6px',
                    background: 'rgba(184, 157, 124, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(184, 157, 124, 0.2)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold-dark)" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <h3 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Exotic & Collectible Cars</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65' }}>
                    Sourcing rare specifications, track-focused configurations, and vintage classics. We navigate private garage sales, verify historical paperwork, and arrange global luxury transport.
                  </p>
                </div>

                {/* Vertical 3 */}
                <div className="glass-panel glass-panel-hover" style={{ padding: '40px', borderRadius: '12px', background: '#ffffff' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '6px',
                    background: 'rgba(140, 120, 103, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(140, 120, 103, 0.15)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2">
                      <circle cx="12" cy="12" r="7" />
                      <polyline points="12 9 12 12 13.5 13.5" />
                      <path d="M16.51 16.51L19 19M5 5L7.49 7.49" />
                    </svg>
                  </div>
                  <h3 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Bespoke Sourcing</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65' }}>
                    Accessing elite watch models, luxury yachts, aviation slots, and fine art pieces. Our team represents your interest at auction and in private rooms, ensuring optimal terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Brokerage Method */}
            <div style={{
              padding: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(184, 157, 124, 0.04), rgba(74, 92, 104, 0.04))',
              border: '1px solid var(--border-color)',
              marginBottom: '80px',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}>
              <div>
                <span className="hero-subtitle" style={{ letterSpacing: '2px' }}>Operational Blueprint</span>
                <h3 className="serif-text" style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  The Middleman Advantage
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                  We don't act as a standard public listing aggregator. Instead, we serve as your single point of contact. We filter out the noise, vet both parties, negotiate price points, and manage the escrow process.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    "Complete Discretion: Direct buyer-broker-seller chain with no public records.",
                    "Active Appraisals: We verify condition, mechanicals, and structural integrity.",
                    "Tax & Transport: Coordination of title transfers, custom forms, and secure delivery."
                  ].map((blue, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(184, 157, 124, 0.1)',
                        border: '1px solid var(--accent-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-gold-dark)',
                        fontSize: '0.7rem',
                        fontWeight: '800'
                      }}>✓</div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>{blue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 25px rgba(30, 37, 43, 0.02)' }}>
                <h4 className="serif-text" style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  Initiate Sourcing Mandate
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Are you searching for a specific spec or trying to exit a large position? Drop your target parameter, and our desk will start hunting immediately.
                </p>
                <button className="btn-gold" style={{ width: '100%' }} onClick={() => setActiveTab('client-portal')}>
                  Open Client Intake Portal
                </button>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              borderTop: '1px solid var(--border-color)',
              padding: '40px 0',
              color: 'var(--text-muted)',
              fontSize: '0.8rem'
            }}>
              <p>© 2026 Vanguard Brokerage Services. All rights reserved. Private member clearing. Direct desk authorization required.</p>
            </div>

          </div>
        )}

        {activeTab === 'showroom' && (
          <Showroom 
            inventory={inventory} 
            onInquireSubmit={handleInquireSubmit} 
          />
        )}

        {activeTab === 'client-portal' && (
          <ClientPortals 
            onSellerSubmit={handleSellerSubmit} 
            onBuyerSubmit={handleBuyerSubmit} 
          />
        )}

        {activeTab === 'broker-desk' && (
          <BrokersDesk 
            inventory={inventory} 
            leads={leads} 
            onUpdateLeadStatus={handleUpdateLeadStatus} 
            onUpdateInventoryStatus={handleUpdateInventoryStatus} 
            onUpdateInventoryDetails={handleUpdateInventoryDetails}
            onApproveListing={handleApproveListing}
            onRejectListing={handleRejectListing}
          />
        )}
      </main>
    </>
  );
}

export default App;
