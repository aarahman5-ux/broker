import React, { useState } from 'react';
import { AssetVisual } from './Showroom';

export default function ListingDetailModal({ item, onClose, onInquireSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hello, I'm interested in the ${item.title}. Please provide more information about scheduling a viewing or starting negotiations.`);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Financial Calculator State
  const [downPayment, setDownPayment] = useState(Math.round(item.price * 0.1));
  const [interestRate, setInterestRate] = useState(item.category === 'apartments' ? 6.5 : 5.5);
  const [loanTerm, setLoanTerm] = useState(item.category === 'apartments' ? 360 : 60);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleInquire = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    onInquireSubmit({
      itemId: item.id,
      itemTitle: item.title,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      message: message
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  // Monthly Loan Math
  const principal = Math.max(0, item.price - downPayment);
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  } else {
    monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}
      >
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* Left Side: Visuals & Financials */}
        <div style={{ borderRight: '1px solid var(--border-color)', height: '100%', display: 'flex', flexDirection: 'column', background: '#fcfbfa' }}>
          <div style={{ height: '260px', position: 'relative' }}>
            <AssetVisual type={item.image} />
            {/* Dark gradient mask only on image to read title text */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(30, 37, 43, 0.7) 0%, transparent 60%)',
              zIndex: 1
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 2,
            }}>
              <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.9)', color: 'var(--accent-gold-dark)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                {item.category}
              </span>
              <h2 className="serif-text" style={{ fontSize: '1.8rem', color: 'white', marginTop: '6px' }}>
                {item.title}
              </h2>
            </div>
          </div>

          {/* Calculator Section */}
          <div style={{ padding: '24px', flexGrow: 1, background: '#fbfaf7' }}>
            <h4 style={{ color: 'var(--accent-gold-dark)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              Acquisition Finance Calculator
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Down Payment */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  <span>Down Payment</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{formatPrice(downPayment)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={item.price} 
                  step={Math.round(item.price / 100)}
                  value={downPayment} 
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  <span>Annual Interest Rate</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="0.1" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                />
              </div>

              {/* Term */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  <span>Amortization Term</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>
                    {item.category === 'apartments' ? `${loanTerm / 12} Years` : `${loanTerm} Months`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={item.category === 'apartments' ? 60 : 12} 
                  max={item.category === 'apartments' ? 360 : 84} 
                  step={item.category === 'apartments' ? 60 : 12}
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                />
              </div>

              {/* Monthly Payment Output */}
              <div style={{
                background: 'rgba(60, 156, 210, 0.08)',
                border: '1px solid rgba(60, 156, 210, 0.25)',
                padding: '16px',
                borderRadius: '6px',
                marginTop: '8px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', fontWeight: '700' }}>
                  Estimated Monthly Outlay
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {formatPrice(monthlyPayment)}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Contact Form */}
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto', background: '#ffffff' }}>
          <div>
            {/* Price tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <div>
                <span className="price-label">Asking Price</span>
                <h3 className="serif-text" style={{ fontSize: '2rem', color: 'var(--accent-gold-dark)', fontWeight: '700' }}>
                  {formatPrice(item.price)}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="price-label">Brokerage Fee</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                  Inc. ({item.commissionRate}%)
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              {item.description}
            </p>

            {/* Specs Table */}
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '6px', fontWeight: '800' }}>
              Asset Details
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              fontSize: '0.82rem',
              marginBottom: '1.5rem'
            }}>
              {Object.entries(item.specs).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(30, 37, 43, 0.05)', paddingBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{key}:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Broker Note */}
            <div style={{
              background: '#fcfbfa',
              borderLeft: '3px solid var(--accent-gold)',
              padding: '12px 16px',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <strong style={{ color: 'var(--accent-gold-dark)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '1px', fontWeight: '800' }}>
                Broker Notes:
              </strong>
              "{item.brokerNote}"
            </div>
          </div>

          {/* Form */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            {isSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(5, 150, 105, 0.06)',
                border: '1px solid rgba(5, 150, 105, 0.2)',
                borderRadius: '6px',
                animation: 'fadeIn 0.3s forwards'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" style={{ marginBottom: '8px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.95rem' }}>Inquiry Registered</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px' }}>
                  Our brokerage desk has locked in your request. A broker will contact you directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquire} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: '800', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Register Inquiry
                </h4>
                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ fontSize: '0.82rem', padding: '8px 12px' }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ fontSize: '0.82rem', padding: '8px 12px' }}
                  />
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="form-control"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ fontSize: '0.82rem', padding: '8px 12px' }}
                />
                <textarea 
                  rows="2" 
                  placeholder="Message parameters..." 
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', resize: 'none' }}
                />
                <button type="submit" className="btn-gold" style={{ padding: '10px', fontSize: '0.85rem', width: '100%', borderRadius: '6px' }}>
                  Transmit Sourcing Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
