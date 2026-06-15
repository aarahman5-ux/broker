import React from 'react';

export default function Navbar({ activeTab, setActiveTab, unreadLeadsCount }) {
  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '20px',
      margin: '0 20px 20px 20px',
      zIndex: 100,
      borderRadius: '12px', /* Domira-style sharper corner */
      border: '1px solid var(--border-color)',
      boxShadow: '0 10px 30px rgba(30, 37, 43, 0.04)',
      background: 'rgba(255, 255, 255, 0.85)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 30px',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '6px', /* Domira-style sharp corners */
            background: 'linear-gradient(135deg, #3c9cd2, #6c80a5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(60, 156, 210, 0.25)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h20L12 2zm0 4.8L17.8 18H6.2L12 6.8z" fill="#ffffff" />
              <circle cx="12" cy="14" r="2" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: '800',
              fontSize: '1.25rem',
              letterSpacing: '1px',
              background: 'linear-gradient(135deg, #3e3536 60%, #3c9cd2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              VANGUARD
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: '700',
              color: 'var(--accent-gold-dark)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '-2px'
            }}>
              Brokerage
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'showroom', label: 'Showroom' },
            { id: 'client-portal', label: 'Client Intake' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === item.id ? '700' : '500',
                fontSize: '0.88rem',
                padding: '10px 18px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                position: 'relative',
                backgroundColor: activeTab === item.id ? 'rgba(30, 37, 43, 0.03)' : 'transparent'
              }}
            >
              {item.label}
              {activeTab === item.id && (
                <span style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '2px',
                  background: 'var(--accent-gold-dark)',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Action Button: Toggle Broker View */}
        <div>
          <button
            onClick={() => setActiveTab(activeTab === 'broker-desk' ? 'home' : 'broker-desk')}
            className={activeTab === 'broker-desk' ? 'btn-secondary' : 'btn-gold'}
            style={{
              padding: '8px 18px',
              fontSize: '0.82rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z" fill="currentColor"/>
            </svg>
            {activeTab === 'broker-desk' ? 'Exit Desk' : "Broker's Desk"}
            {unreadLeadsCount > 0 && activeTab !== 'broker-desk' && (
              <span style={{
                background: '#dc2626',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '4px',
                marginLeft: '4px',
                boxShadow: '0 2px 5px rgba(220, 38, 38, 0.3)'
              }}>
                {unreadLeadsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
