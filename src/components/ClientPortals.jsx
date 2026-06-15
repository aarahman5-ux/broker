import React, { useState } from 'react';

export default function ClientPortals({ onSellerSubmit, onBuyerSubmit }) {
  const [activePortal, setActivePortal] = useState('sell'); // 'sell' or 'buy'
  
  // Seller Form State
  const [sellCategory, setSellCategory] = useState('apartments');
  const [sellTitle, setSellTitle] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDesc, setSellDesc] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  
  // Dynamic specs depending on category
  const [specLocation, setSpecLocation] = useState('');
  const [specArea, setSpecArea] = useState('');
  const [specBedrooms, setSpecBedrooms] = useState('3');
  const [specBathrooms, setSpecBathrooms] = useState('2');
  
  const [specYear, setSpecYear] = useState('2024');
  const [specMileage, setSpecMileage] = useState('');
  const [specEngine, setSpecEngine] = useState('');
  const [specTransmission, setSpecTransmission] = useState('Automatic');
  const [specPower, setSpecPower] = useState('');
  
  const [specType, setSpecType] = useState('');
  const [specBrand, setSpecBrand] = useState('');
  const [specCondition, setSpecCondition] = useState('Mint');

  // Buyer Form State
  const [buyAssetType, setBuyAssetType] = useState('Apartment');
  const [buyBudget, setBuyBudget] = useState('');
  const [buyDesc, setBuyDesc] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  // Success states
  const [isSellSubmitted, setIsSellSubmitted] = useState(false);
  const [isBuySubmitted, setIsBuySubmitted] = useState(false);

  const commissionRates = {
    apartments: 2.5,
    cars: 4.0,
    custom: 5.0
  };

  const getEstimatedCommission = () => {
    const price = Number(sellPrice);
    if (isNaN(price) || price <= 0) return 0;
    const rate = commissionRates[sellCategory];
    return price * (rate / 100);
  };

  const getNetPayout = () => {
    const price = Number(sellPrice);
    if (isNaN(price) || price <= 0) return 0;
    return price - getEstimatedCommission();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSellerForm = (e) => {
    e.preventDefault();
    if (!sellTitle || !sellPrice || !sellerName || !sellerEmail || !sellerPhone) return;

    let specs = {};
    if (sellCategory === 'apartments') {
      specs = {
        "Location": specLocation || "N/A",
        "Area": specArea ? `${specArea} sq ft` : "N/A",
        "Bedrooms": specBedrooms,
        "Bathrooms": specBathrooms,
        "Year Built": specYear
      };
    } else if (sellCategory === 'cars') {
      specs = {
        "Year": specYear,
        "Mileage": specMileage ? `${Number(specMileage).toLocaleString()} mi` : "N/A",
        "Engine": specEngine || "N/A",
        "Transmission": specTransmission,
        "Power": specPower ? `${specPower} hp` : "N/A"
      };
    } else {
      specs = {
        "Type": specType || "N/A",
        "Brand": specBrand || "N/A",
        "Condition": specCondition
      };
    }

    onSellerSubmit({
      category: sellCategory,
      title: sellTitle,
      description: sellDesc,
      price: Number(sellPrice),
      commissionRate: commissionRates[sellCategory],
      specs: specs,
      sellerName,
      sellerEmail,
      sellerPhone
    });

    setIsSellSubmitted(true);
    setTimeout(() => {
      setIsSellSubmitted(false);
      setSellTitle('');
      setSellPrice('');
      setSellDesc('');
      setSellerName('');
      setSellerEmail('');
      setSellerPhone('');
    }, 4000);
  };

  const handleBuyerForm = (e) => {
    e.preventDefault();
    if (!buyBudget || !buyerName || !buyerEmail || !buyerPhone || !buyDesc) return;

    onBuyerSubmit({
      clientName: buyerName,
      clientEmail: buyerEmail,
      clientPhone: buyerPhone,
      details: {
        assetType: buyAssetType,
        targetBudget: Number(buyBudget),
        description: buyDesc
      },
      message: `Looking to source: ${buyAssetType}. Target Budget: ${formatPrice(buyBudget)}. Details: ${buyDesc}`
    });

    setIsBuySubmitted(true);
    setTimeout(() => {
      setIsBuySubmitted(false);
      setBuyBudget('');
      setBuyDesc('');
      setBuyerName('');
      setBuyerEmail('');
      setBuyerPhone('');
    }, 4000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 20px 60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <span className="hero-subtitle">Brokerage Services</span>
        <h2 className="serif-text" style={{ fontSize: '3rem', color: '#000000', marginTop: '0.5rem', fontWeight: '700' }}>
          Client Intake Desk
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '1rem auto 0 auto', lineHeight: '1.65' }}>
          Whether you want to sell your high-value assets through our network or hire our desk to locate a rare find, we manage the deal from start to finish.
        </p>
      </div>

      {/* Tabs */}
      <div className="tab-container" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
        <button 
          className={`tab-btn ${activePortal === 'sell' ? 'active' : ''}`}
          onClick={() => setActivePortal('sell')}
          style={{ fontSize: '1.05rem', padding: '12px 24px' }}
        >
          Sell An Asset (List With Us)
        </button>
        <button 
          className={`tab-btn ${activePortal === 'buy' ? 'active' : ''}`}
          onClick={() => setActivePortal('buy')}
          style={{ fontSize: '1.05rem', padding: '12px 24px' }}
        >
          Hire To Source (Buy An Asset)
        </button>
      </div>

      {/* Seller Portal */}
      {activePortal === 'sell' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 4px 30px rgba(30, 37, 43, 0.02)' }}>
          {isSellSubmitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              animation: 'fadeIn 0.3s forwards'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(240, 135, 135, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--accent-gold)',
                boxShadow: '0 4px 15px rgba(240, 135, 135, 0.2)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold-dark)" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="serif-text" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Listing Request Received
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: '1.65' }}>
                Our brokerage desk has captured your asset submission. We will review the specifications, assess market value, and contact you to arrange terms.
              </p>
              <div style={{
                display: 'inline-block',
                background: '#f8f7f4',
                border: '1px dashed var(--border-color)',
                padding: '16px 28px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}>
                Reference Number: <span style={{ color: 'var(--accent-gold-dark)', fontWeight: '700' }}>TX-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSellerForm}>
              <h3 className="serif-text" style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Asset Brokerage Request
              </h3>
              
              <div className="form-group">
                <label className="form-label">Asset Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { id: 'apartments', label: 'Real Estate' },
                    { id: 'cars', label: 'Vehicle' },
                    { id: 'custom', label: 'Custom/Bespoke' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSellCategory(cat.id)}
                      style={{
                        background: sellCategory === cat.id ? 'rgba(240, 135, 135, 0.1)' : '#fcfbfa',
                        border: '1px solid',
                        borderColor: sellCategory === cat.id ? 'var(--accent-gold)' : 'var(--border-color)',
                        color: sellCategory === cat.id ? 'var(--accent-gold-dark)' : 'var(--text-secondary)',
                        padding: '12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Asset Name / Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 2025 Ferrari F8, Penthouse Loft at Park Ave..." 
                  required
                  value={sellTitle}
                  onChange={(e) => setSellTitle(e.target.value)}
                />
              </div>

              {/* Dynamic Spec Inputs */}
              {sellCategory === 'apartments' && (
                <div className="animate-fade-in">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="City, Country"
                        value={specLocation}
                        onChange={(e) => setSpecLocation(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Area (sq ft)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="e.g. 2500"
                        value={specArea}
                        onChange={(e) => setSpecArea(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Bedrooms</label>
                      <select 
                        className="form-control"
                        value={specBedrooms}
                        onChange={(e) => setSpecBedrooms(e.target.value)}
                      >
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4 Bedrooms</option>
                        <option value="5+">5+ Bedrooms</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bathrooms</label>
                      <select 
                        className="form-control"
                        value={specBathrooms}
                        onChange={(e) => setSpecBathrooms(e.target.value)}
                      >
                        <option value="1">1 Bathroom</option>
                        <option value="1.5">1.5 Bathrooms</option>
                        <option value="2">2 Bathrooms</option>
                        <option value="3">3 Bathrooms</option>
                        <option value="4+">4+ Bathrooms</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {sellCategory === 'cars' && (
                <div className="animate-fade-in">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Model Year</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. 2024"
                        value={specYear}
                        onChange={(e) => setSpecYear(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mileage (miles)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="e.g. 1500"
                        value={specMileage}
                        onChange={(e) => setSpecMileage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Engine / Powerplant</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Twin-Turbo V8, Electric"
                        value={specEngine}
                        onChange={(e) => setSpecEngine(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Transmission</label>
                      <select 
                        className="form-control"
                        value={specTransmission}
                        onChange={(e) => setSpecTransmission(e.target.value)}
                      >
                        <option value="Automatic">Automatic / Dual-Clutch</option>
                        <option value="Manual">Manual</option>
                        <option value="Direct-Drive">Direct-Drive (EV)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {sellCategory === 'custom' && (
                <div className="animate-fade-in">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Asset Type</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Luxury Yacht, Skeleton Watch, Fine Art"
                        value={specType}
                        onChange={(e) => setSpecType(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Brand / Creator</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Audemars Piguet, Riva, Warhol"
                        value={specBrand}
                        onChange={(e) => setSpecBrand(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-row" style={{ alignItems: 'start' }}>
                <div className="form-group" style={{ flexGrow: 1 }}>
                  <label className="form-label">Target Asking Price ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 500000" 
                    required
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                  />
                </div>

                {/* Net Payout Calculator */}
                <div style={{
                  background: '#fcfbfa',
                  border: '1px solid var(--border-color)',
                  padding: '16px 20px',
                  borderRadius: '6px',
                  marginTop: '1.6rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', letterSpacing: '0.5px', fontWeight: '700' }}>
                      Brokerage commission ({commissionRates[sellCategory]}%)
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {formatPrice(getEstimatedCommission())}
                    </strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-gold-dark)', display: 'block', letterSpacing: '0.5px', fontWeight: '700' }}>
                      Estimated Net Payout
                    </span>
                    <strong style={{ color: 'var(--accent-gold-dark)', fontSize: '1.2rem', fontWeight: '800' }}>
                      {formatPrice(getNetPayout())}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Asset Description & Condition</label>
                <textarea 
                  rows="3" 
                  className="form-control" 
                  placeholder="Provide history, upgrades, condition, and any specific terms you want for the sale..."
                  value={sellDesc}
                  onChange={(e) => setSellDesc(e.target.value)}
                />
              </div>

              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '2rem 0 1rem 0', borderBottom: '2px solid var(--border-color)', paddingBottom: '6px', fontWeight: '800' }}>
                Seller Contact Information
              </h4>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Marcus Sterling" 
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="m.sterling@example.com" 
                    required
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="+1 (555) 234-5678" 
                  required
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', borderRadius: '6px', marginTop: '1.5rem' }}>
                Submit Listing to Broker Desk
              </button>
            </form>
          )}
        </div>
      )}

      {/* Buyer Portal */}
      {activePortal === 'buy' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 4px 30px rgba(30, 37, 43, 0.02)' }}>
          {isBuySubmitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              animation: 'fadeIn 0.3s forwards'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(74, 92, 104, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--accent-indigo)',
                boxShadow: '0 4px 15px rgba(74, 92, 104, 0.15)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="serif-text" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Sourcing Mandate Created
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: '1.65' }}>
                We have registered your search target. Our sourcing team will query our private collector groups and off-market databases.
              </p>
              <div style={{
                display: 'inline-block',
                background: '#f8f7f4',
                border: '1px dashed var(--border-color)',
                padding: '16px 28px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}>
                Mandate ID: <span style={{ color: 'var(--accent-indigo)', fontWeight: '700' }}>SR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBuyerForm}>
              <h3 className="serif-text" style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Hire to Source Rare Asset
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Asset Sourcing Category</label>
                  <select 
                    className="form-control"
                    value={buyAssetType}
                    onChange={(e) => setBuyAssetType(e.target.value)}
                  >
                    <option value="Apartment / Penthouse">Apartment / Real Estate</option>
                    <option value="Sports Car / Hypercar">Sports Car / Hypercar</option>
                    <option value="Luxury Watch / Horology">Luxury Watch / Horology</option>
                    <option value="Yacht / Marine Craft">Yacht / Marine Craft</option>
                    <option value="Collectible / Custom Listing">Bespoke / Custom Asset</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sourcing Target Budget ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 1500000" 
                    required
                    value={buyBudget}
                    onChange={(e) => setBuyBudget(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Desired Specifications & Sourcing Requirements</label>
                <textarea 
                  rows="4" 
                  className="form-control" 
                  placeholder="Specify model years, design aesthetics, mileage limitations, preferred regions, or architectural preferences. The more specific, the faster our network can locate it..."
                  required
                  value={buyDesc}
                  onChange={(e) => setBuyDesc(e.target.value)}
                />
              </div>

              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '2rem 0 1rem 0', borderBottom: '2px solid var(--border-color)', paddingBottom: '6px', fontWeight: '800' }}>
                Buyer Contact Details
              </h4>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Alexandra DuPont" 
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="alexandra@dupont.net" 
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="+1 (555) 987-6543" 
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '6px', marginTop: '1.5rem' }}>
                Initiate Sourcing Mandate
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
