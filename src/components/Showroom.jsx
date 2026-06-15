import React, { useState } from 'react';
import ListingDetailModal from './ListingDetailModal';

// Interactive SVG Visuals for luxury items - Adjusted for light theme
export function AssetVisual({ type, animated = false }) {
  const hasImageFile = ['toyota_supra', 'honda_nsx', 'suzuki_swift', 'mercedes_g63'].includes(type);
  if (hasImageFile) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img 
          src={`/images/${type}.png`} 
          alt={type.replace('_', ' ')} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
          }} 
          className="showroom-asset-image"
        />
      </div>
    );
  }

  const isPorsche = type === 'porsche';
  const isFerrari = type === 'ferrari';
  const isPenthouse = type === 'penthouse';
  const isVilla = type === 'villa';
  const isYacht = type === 'yacht';
  const isWatch = type === 'watch';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'linear-gradient(180deg, #eae8e1 0%, #dcdad0 100%)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Warm sun-leak overlay */}
      <div style={{
        position: 'absolute',
        width: '120%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, rgba(60, 156, 210, 0.15) 0%, transparent 65%)',
        top: '-20%',
        left: '-10%',
        pointerEvents: 'none'
      }} />

      {isPenthouse && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfd2cd" />
              <stop offset="60%" stopColor="#e5e5e5" />
              <stop offset="100%" stopColor="#e9e8e1" />
            </linearGradient>
            <linearGradient id="buildingGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4a5c68" />
              <stop offset="50%" stopColor="#697b87" />
              <stop offset="100%" stopColor="#35434d" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3c9cd2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3c9cd2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#skyGrad)" />
          {/* Background buildings */}
          <rect x="30" y="80" width="60" height="120" fill="#a3a8a2" opacity="0.4" />
          <rect x="310" y="60" width="70" height="140" fill="#a3a8a2" opacity="0.4" />
          {/* Main Penthouse Tower */}
          <rect x="130" y="30" width="140" height="170" fill="url(#buildingGrad)" rx="2" />
          {/* Windows */}
          <g opacity="0.9">
            {[0, 1, 2, 3, 4, 5].map((row) => 
              [0, 1, 2, 3].map((col) => (
                <rect 
                  key={`${row}-${col}`}
                  x={145 + col * 30} 
                  y={50 + row * 22} 
                  width="18" 
                  height="10" 
                  fill={col % 2 === 0 && row % 3 !== 0 ? "#fef08a" : "#1e252b"} 
                  opacity={col % 2 === 0 && row % 3 !== 0 ? "0.8" : "0.25"} 
                />
              ))
            )}
          </g>
          {/* Balcony highlights */}
          <rect x="120" y="25" width="160" height="4" fill="#88b5cc" opacity="0.7" />
          <rect x="130" y="110" width="140" height="6" fill="url(#glowGrad)" />
        </svg>
      )}

      {isVilla && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5ebe0" />
              <stop offset="50%" stopColor="#f3d5b5" />
              <stop offset="90%" stopColor="#e8ac65" />
              <stop offset="100%" stopColor="#3c9cd2" />
            </linearGradient>
            <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#678d9f" />
              <stop offset="100%" stopColor="#3a5666" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sunsetGrad)" />
          {/* Sun */}
          <circle cx="280" cy="100" r="32" fill="#fff" opacity="0.9" filter="blur(2px)" />
          {/* Cliff */}
          <path d="M0 200 L0 120 Q80 130 150 145 T280 178 L400 178 L400 200 Z" fill="#35434d" />
          {/* Modern Villa Structure */}
          <g transform="translate(45, 85)">
            <rect x="0" y="0" width="115" height="48" fill="#ffffff" rx="2" />
            <rect x="12" y="8" width="90" height="40" fill="#35434d" />
            <rect x="8" y="40" width="98" height="8" fill="#3c9cd2" />
            <rect x="5" y="-12" width="85" height="12" fill="#ffffff" opacity="0.9" />
            <rect x="12" y="-8" width="65" height="8" fill="#aedbf2" opacity="0.7" />
            {/* Pool */}
            <rect x="-15" y="44" width="45" height="4" fill="#58c5f6" />
          </g>
          {/* Sea water */}
          <rect x="0" y="172" width="400" height="28" fill="url(#seaGrad)" opacity="0.95" />
          <path d="M0 172 Q40 170 80 172 T160 172 T240 172 T320 172 T400 172" stroke="#8ecae6" strokeWidth="1.5" opacity="0.5" />
        </svg>
      )}

      {isPorsche && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="porscheGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7e8b96" />
              <stop offset="50%" stopColor="#cfd7de" />
              <stop offset="100%" stopColor="#4a5c68" />
            </linearGradient>
            <linearGradient id="goldBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3c9cd2" />
              <stop offset="100%" stopColor="#6c80a5" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="#e3e1d9" />
          {/* Ground grid lines */}
          <path d="M0 150 L400 150 M0 170 L400 170 M0 190 L400 190" stroke="#d5d3c9" strokeWidth="1" />
          {/* Warm speed bar */}
          <path d="M50 140 Q200 135 350 145" stroke="url(#goldBar)" strokeWidth="3" opacity="0.4" filter="blur(3px)" />
          {/* Porsche body */}
          <g transform="translate(60, 50)">
            {/* Spoiler */}
            <path d="M20 50 L0 42 L10 38 L30 48 Z" fill="#2b353e" />
            <rect x="25" y="46" width="4" height="20" fill="#2b353e" />
            {/* Body roofline */}
            <path d="M22 64 C40 50, 80 35, 130 35 C170 35, 210 52, 250 68 C270 76, 280 82, 290 92 L20 92 Z" fill="url(#porscheGrad)" />
            {/* Cabin */}
            <path d="M90 44 C110 44, 150 44, 175 56 C180 59, 185 64, 170 64 L85 64 Z" fill="#1b2329" />
            {/* Wheels */}
            <circle cx="70" cy="92" r="24" fill="#1b2329" />
            <circle cx="220" cy="92" r="24" fill="#1b2329" />
            <circle cx="70" cy="92" r="20" fill="#4a5c68" stroke="#3c9cd2" strokeWidth="2" />
            <circle cx="70" cy="92" r="8" fill="#1b2329" />
            <circle cx="220" cy="92" r="20" fill="#4a5c68" stroke="#3c9cd2" strokeWidth="2" />
            <circle cx="220" cy="92" r="8" fill="#1b2329" />
            {/* Light beam */}
            <path d="M275 80 Q320 85 350 95" stroke="#fef08a" strokeWidth="4" opacity="0.6" filter="blur(6px)" />
          </g>
        </svg>
      )}

      {isFerrari && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ferrariGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b82525" />
              <stop offset="40%" stopColor="#e53838" />
              <stop offset="100%" stopColor="#9c1d1d" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="#e3e1d9" />
          {/* Ground reflection */}
          <ellipse cx="200" cy="170" rx="140" ry="20" fill="#9c1d1d" opacity="0.12" filter="blur(12px)" />
          {/* Car body */}
          <g transform="translate(50, 60)">
            <path d="M10 80 C30 65, 90 40, 150 40 C210 40, 260 62, 300 80 Z" fill="url(#ferrariGrad)" />
            {/* Cabin */}
            <path d="M100 48 C120 48, 160 48, 185 60 L90 60 Z" fill="#1b2329" />
            {/* Wheels */}
            <circle cx="75" cy="80" r="22" fill="#1b2329" stroke="#3c9cd2" strokeWidth="1.5" />
            <circle cx="235" cy="80" r="22" fill="#1b2329" stroke="#3c9cd2" strokeWidth="1.5" />
            <circle cx="75" cy="80" r="6" fill="#fef08a" />
            <circle cx="235" cy="80" r="6" fill="#fef08a" />
          </g>
          {/* Line highlight */}
          <path d="M0 140 L400 140" stroke="rgba(60, 156, 210, 0.2)" strokeWidth="1" />
        </svg>
      )}

      {isYacht && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eddcd2" />
              <stop offset="60%" stopColor="#f3d5b5" />
              <stop offset="100%" stopColor="#e8ac65" />
            </linearGradient>
            <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#f1efe9" />
              <stop offset="100%" stopColor="#3c9cd2" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#skyGold)" />
          {/* Yacht Hull */}
          <g transform="translate(60, 80)">
            {/* Cabin glass */}
            <path d="M60 40 L160 30 L190 55 L50 55 Z" fill="#35434d" opacity="0.8" />
            <path d="M90 32 L150 25 L160 38 L80 38 Z" fill="#8ecae6" opacity="0.6" />
            {/* Structure */}
            <path d="M10 55 L220 50 C260 50, 270 58, 280 68 L25 68 Z" fill="url(#hullGrad)" />
            <path d="M0 65 L270 65 L250 82 L15 82 Z" fill="#35434d" />
            {/* Gold stripe */}
            <path d="M22 67 L265 67" stroke="#3c9cd2" strokeWidth="2" />
          </g>
          {/* Waves */}
          <path d="M0 160 Q50 152 100 160 T200 160 T300 160 T400 160 L400 200 L0 200 Z" fill="#1b2329" />
          <path d="M0 168 Q80 162 160 168 T320 168 T400 168" stroke="#4a5c68" strokeWidth="2" opacity="0.3" />
        </svg>
      )}

      {isWatch && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="watchDial" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="90%" stopColor="#f8f7f4" />
              <stop offset="100%" stopColor="#3c9cd2" />
            </radialGradient>
          </defs>
          <rect width="400" height="200" fill="#e3e1d9" />
          {/* Watch strap */}
          <rect x="170" y="10" width="60" height="180" fill="#2b353e" rx="4" stroke="#1e252b" strokeWidth="1" />
          {/* Watch case */}
          <circle cx="200" cy="100" r="65" fill="url(#watchDial)" stroke="#3c9cd2" strokeWidth="3" />
          {/* Notches */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 200 100)`}>
              <line x1="200" y1="40" x2="200" y2="48" stroke="#3c9cd2" strokeWidth="2" />
            </g>
          ))}
          {/* Gears */}
          <circle cx="185" cy="110" r="18" fill="none" stroke="#3c9cd2" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <circle cx="212" cy="90" r="22" fill="none" stroke="#8c7867" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          {/* Hands */}
          <line x1="200" y1="100" x2="200" y2="60" stroke="#1e252b" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="100" x2="230" y2="110" stroke="#1e252b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="200" y1="100" x2="180" y2="120" stroke="#3c9cd2" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pin */}
          <circle cx="200" cy="100" r="4" fill="#3c9cd2" />
        </svg>
      )}

      {!isPorsche && !isFerrari && !isPenthouse && !isVilla && !isYacht && !isWatch && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#eae8e1" />
          <rect x="120" y="60" width="160" height="80" rx="4" fill="#ffffff" stroke="#3c9cd2" strokeWidth="2" />
          <text x="200" y="105" fill="#1e252b" fontSize="14" fontWeight="600" textAnchor="middle">EXCLUSIVE ASSET</text>
        </svg>
      )}

      {/* Glass gradient overlay bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to top, rgba(247, 246, 242, 0.8) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

export default function Showroom({ inventory, onInquireSubmit }) {
  const [category, setCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      Object.values(item.specs).some(val => val.toLowerCase().includes(search.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 20px 60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <span className="hero-subtitle">Our Curated Portfolio</span>
        <h2 className="serif-text" style={{ fontSize: '3rem', color: '#000000', marginTop: '0.5rem', fontWeight: '700' }}>
          Active Showroom
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0 auto', lineHeight: '1.65' }}>
          Browse premium properties, elite vehicles, and high-value assets currently represented by our brokerage. Contact our desk for exclusive arrangements.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel" style={{
        padding: '20px 30px',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        borderRadius: '12px',
        background: '#ffffff',
        boxShadow: '0 4px 20px rgba(30, 37, 43, 0.02)'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, minWidth: '280px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            type="text" 
            placeholder="Search spec, model, location..." 
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', background: '#fcfbfa', border: '1px solid var(--border-color)', borderRadius: '6px' }}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'apartments', label: 'Real Estate' },
            { id: 'cars', label: 'Vehicles' },
            { id: 'custom', label: 'Bespoke' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              style={{
                background: category === tab.id ? 'var(--accent-gold)' : 'transparent',
                border: '1px solid',
                borderColor: category === tab.id ? 'var(--accent-gold)' : 'var(--border-color)',
                color: category === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'var(--transition-smooth)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control"
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="under_contract">Under Contract</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Showroom Grid */}
      {filteredInventory.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '60px',
          textAlign: 'center',
          borderRadius: '12px',
          background: '#ffffff',
          color: 'var(--text-secondary)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: '1rem' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <h3 style={{ fontWeight: '700' }}>No assets matched your search</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>
            Try adjusting filters or checking spelling.
          </p>
        </div>
      ) : (
        <div className="asset-grid">
          {filteredInventory.map((item, index) => (
            <div 
              key={item.id} 
              className="asset-card animate-slide-up"
              onClick={() => setSelectedAsset(item)}
              style={{ 
                cursor: 'pointer',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className="asset-card-image-wrapper">
                <AssetVisual type={item.image} />
                <div className="asset-card-tag">{item.category}</div>
                <div className={`asset-card-status status-${item.status}`}>
                  {item.status.replace('_', ' ')}
                </div>
              </div>

              <div className="asset-card-content">
                <div>
                  <h3 className="asset-card-title">{item.title}</h3>
                  <p className="asset-card-description">{item.description}</p>
                </div>

                {/* Specs quick view */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '1rem',
                  overflow: 'hidden'
                }}>
                  {Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                    <div 
                      key={key} 
                      style={{
                        background: '#f8f7f4',
                        border: '1px solid var(--border-color)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>{key}:</span>
                      <span style={{ fontWeight: '600' }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div className="asset-card-footer">
                  <div className="asset-card-price">
                    <span className="price-label">Asking Price</span>
                    <span className="price-val gold">{formatPrice(item.price)}</span>
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    color: 'var(--accent-gold-dark)',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    View Dossier
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Listing Detail Modal */}
      {selectedAsset && (
        <ListingDetailModal 
          item={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
          onInquireSubmit={onInquireSubmit}
        />
      )}
    </div>
  );
}
