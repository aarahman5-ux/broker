import React, { useState } from 'react';

export default function BrokersDesk({ 
  inventory, 
  leads, 
  onUpdateLeadStatus, 
  onUpdateInventoryStatus, 
  onUpdateInventoryDetails,
  onApproveListing,
  onRejectListing
}) {
  const [deskTab, setDeskTab] = useState('leads');
  
  // States for inline edits
  const [editingItemId, setEditingItemId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [editRate, setEditRate] = useState('');
  
  // States for queue approvals
  const [approvingItemId, setApprovingItemId] = useState(null);
  const [approveNote, setApproveNote] = useState('');
  const [approveRate, setApproveRate] = useState('');
  const [approvePrice, setApprovePrice] = useState('');

  // Stats Calculations
  const activeListings = inventory.filter(item => item.status !== 'sold' && !item.pendingApproval);
  const totalValue = activeListings.reduce((sum, item) => sum + item.price, 0);
  const pipelineCommission = activeListings.reduce((sum, item) => sum + (item.price * (item.commissionRate / 100)), 0);
  const pendingQueue = inventory.filter(item => item.pendingApproval);
  const unreadLeadsCount = leads.filter(l => l.status === 'unread').length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditNote(item.brokerNote);
    setEditRate(item.commissionRate);
  };

  const handleSaveEdit = (itemId) => {
    onUpdateInventoryDetails(itemId, {
      brokerNote: editNote,
      commissionRate: Number(editRate)
    });
    setEditingItemId(null);
  };

  const handleStartApproval = (item) => {
    setApprovingItemId(item.id);
    setApprovePrice(item.price);
    setApproveRate(item.commissionRate || 3.0);
    setApproveNote(`Vetted by our desk. High-quality ${item.category === 'cars' ? 'vehicle' : 'property'} ready for immediate acquisition.`);
  };

  const handleSaveApproval = (itemId) => {
    onApproveListing(itemId, {
      price: Number(approvePrice),
      commissionRate: Number(approveRate),
      brokerNote: approveNote
    });
    setApprovingItemId(null);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 20px 60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
        <div>
          <span className="hero-subtitle">Administrative Panel</span>
          <h2 className="serif-text" style={{ fontSize: '3rem', color: '#000000', marginTop: '0.5rem', fontWeight: '700' }}>
            Broker's Desk
          </h2>
        </div>
        <div style={{
          background: 'rgba(240, 135, 135, 0.12)',
          border: '1px solid var(--accent-gold)',
          padding: '8px 18px',
          borderRadius: '6px',
          color: 'var(--accent-gold-dark)',
          fontSize: '0.82rem',
          fontWeight: '800',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Authorized Session
        </div>
      </div>

      {/* Analytics stats */}
      <div className="dashboard-stats">
        <div className="glass-panel stat-card">
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.5px' }}>
            Showroom Value
          </span>
          <div className="stat-num">{formatPrice(totalValue)}</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Across {activeListings.length} Active Listings
          </span>
        </div>

        <div className="glass-panel stat-card">
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-gold-dark)', fontWeight: '700', letterSpacing: '0.5px' }}>
            Pipeline Commission
          </span>
          <div className="stat-num" style={{ color: 'var(--accent-gold-dark)' }}>{formatPrice(pipelineCommission)}</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Average rate: {(pipelineCommission / (totalValue || 1) * 100).toFixed(1)}%
          </span>
        </div>

        <div className="glass-panel stat-card">
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-indigo)', fontWeight: '700', letterSpacing: '0.5px' }}>
            Pending Appraisals
          </span>
          <div className="stat-num" style={{ color: 'var(--accent-indigo)' }}>{pendingQueue.length}</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Sellers awaiting callback
          </span>
        </div>

        <div className="glass-panel stat-card">
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-primary)', fontWeight: '700', letterSpacing: '0.5px' }}>
            Total Inquiries
          </span>
          <div className="stat-num">{leads.length}</div>
          <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '700' }}>
            {unreadLeadsCount} Actionable Leads
          </span>
        </div>
      </div>

      {/* Main Admin layout */}
      <div className="dashboard-grid">
        {/* Side nav */}
        <div className="dashboard-nav">
          <button 
            className={`dashboard-nav-item ${deskTab === 'leads' ? 'active' : ''}`}
            onClick={() => setDeskTab('leads')}
            style={{ background: 'none', border: 'none', textAlign: 'left', font: 'inherit' }}
          >
            Leads & Inquiries
            {unreadLeadsCount > 0 && (
              <span style={{ background: '#dc2626', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: 'auto', fontWeight: '700' }}>
                {unreadLeadsCount}
              </span>
            )}
          </button>

          <button 
            className={`dashboard-nav-item ${deskTab === 'queue' ? 'active' : ''}`}
            onClick={() => setDeskTab('queue')}
            style={{ background: 'none', border: 'none', textAlign: 'left', font: 'inherit' }}
          >
            Intake Queue
            {pendingQueue.length > 0 && (
              <span style={{ background: 'var(--accent-gold-dark)', color: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: 'auto', fontWeight: '700' }}>
                {pendingQueue.length}
              </span>
            )}
          </button>

          <button 
            className={`dashboard-nav-item ${deskTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setDeskTab('inventory')}
            style={{ background: 'none', border: 'none', textAlign: 'left', font: 'inherit' }}
          >
            Showroom Inventory
          </button>
        </div>

        {/* Content Pane */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: '12px', minHeight: '400px', background: '#ffffff', boxShadow: '0 4px 30px rgba(30, 37, 43, 0.02)' }}>
          
          {/* Tab: Leads */}
          {deskTab === 'leads' && (
            <div className="animate-fade-in">
              <h3 className="serif-text" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '700' }}>
                Client Inquiries Log
              </h3>
              
              {leads.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No inquiries received yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {leads.map((lead) => (
                    <div key={lead.id} className="glass-panel" style={{ padding: '20px', background: '#fcfbfa', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <span className={`badge ${
                            lead.type === 'inquiry' ? 'badge-unread' : lead.type === 'sourcing' ? 'badge-in-progress' : 'badge-pending'
                          }`} style={{ marginRight: '10px' }}>
                            {lead.type}
                          </span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{lead.clientName}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lead.date}</span>
                          <select 
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                            className="form-control"
                            style={{ padding: '4px 10px', fontSize: '0.75rem', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                          >
                            <option value="unread">Unread</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        <div>Email: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{lead.clientEmail}</span> | Phone: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{lead.clientPhone}</span></div>
                        {lead.itemTitle && <div style={{ marginTop: '4px' }}>Target Listing: <span style={{ color: 'var(--accent-gold-dark)', fontWeight: '700' }}>{lead.itemTitle}</span></div>}
                      </div>

                      <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                        {lead.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Intake Queue */}
          {deskTab === 'queue' && (
            <div className="animate-fade-in">
              <h3 className="serif-text" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '700' }}>
                Seller Submissions Appraisal Queue
              </h3>

              {pendingQueue.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No listings currently awaiting approval.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {pendingQueue.map((item) => (
                    <div key={item.id} className="glass-panel" style={{ padding: '24px', background: '#fcfbfa', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <span className="badge badge-pending" style={{ marginRight: '10px' }}>{item.category}</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: '700' }}>{item.title}</strong>
                        </div>
                        <span style={{ fontSize: '1.1rem', color: 'var(--accent-gold-dark)', fontWeight: '800' }}>
                          Target: {formatPrice(item.price)}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                        {item.description}
                      </p>

                      {/* Specs */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {Object.entries(item.specs).map(([key, val]) => (
                          <span key={key} style={{ background: '#ffffff', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-muted)' }}>{key}:</strong> {val}
                          </span>
                        ))}
                      </div>

                      {/* Client info */}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        Seller Client: <strong style={{ color: 'var(--text-primary)' }}>{item.sellerInfo.name}</strong> | Email: <strong style={{ color: 'var(--text-primary)' }}>{item.sellerInfo.email}</strong> | Phone: <strong style={{ color: 'var(--text-primary)' }}>{item.sellerInfo.phone}</strong>
                      </div>

                      {/* Action forms */}
                      {approvingItemId === item.id ? (
                        <div className="glass-panel animate-fade-in" style={{ padding: '20px', background: '#ffffff', border: '1px solid var(--accent-gold)', marginTop: '15px' }}>
                          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.5px' }}>Appraisal & Publishing Panel</h4>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Set Showroom Listing Price ($)</label>
                              <input 
                                type="number" 
                                className="form-control"
                                value={approvePrice}
                                onChange={(e) => setApprovePrice(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Brokerage Commission (%)</label>
                              <input 
                                type="number" 
                                className="form-control"
                                value={approveRate}
                                onChange={(e) => setApproveRate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Broker Assessment / Recommendation Note</label>
                            <textarea 
                              rows="2"
                              className="form-control"
                              value={approveNote}
                              onChange={(e) => setApproveNote(e.target.value)}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button className="btn-secondary" onClick={() => setApprovingItemId(null)} style={{ padding: '8px 18px', fontSize: '0.78rem' }}>Cancel</button>
                            <button className="btn-gold" onClick={() => handleSaveApproval(item.id)} style={{ padding: '8px 18px', fontSize: '0.78rem' }}>Approve & Publish</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                          <button className="btn-secondary" onClick={() => onRejectListing(item.id)} style={{ padding: '8px 18px', fontSize: '0.78rem', color: '#dc2626' }}>Reject Submission</button>
                          <button className="btn-primary" onClick={() => handleStartApproval(item)} style={{ padding: '8px 18px', fontSize: '0.78rem' }}>Appraise & Publish</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Showroom Inventory */}
          {deskTab === 'inventory' && (
            <div className="animate-fade-in">
              <h3 className="serif-text" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '700' }}>
                Inventory Directory
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px 10px' }}>Asset</th>
                      <th style={{ padding: '12px 10px' }}>Category</th>
                      <th style={{ padding: '12px 10px' }}>Price</th>
                      <th style={{ padding: '12px 10px' }}>Comm. Rate</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.filter(item => !item.pendingApproval).map((item) => (
                      <React.Fragment key={item.id}>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '16px 10px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.title}</td>
                          <td style={{ padding: '16px 10px', textTransform: 'capitalize' }}>{item.category}</td>
                          <td style={{ padding: '16px 10px', color: 'var(--accent-gold-dark)', fontWeight: '700' }}>{formatPrice(item.price)}</td>
                          <td style={{ padding: '16px 10px' }}>{item.commissionRate}%</td>
                          <td style={{ padding: '16px 10px' }}>
                            <select 
                              value={item.status}
                              onChange={(e) => onUpdateInventoryStatus(item.id, e.target.value)}
                              className="form-control"
                              style={{ padding: '4px 10px', fontSize: '0.75rem', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                            >
                              <option value="available">Available</option>
                              <option value="under_contract">Under Contract</option>
                              <option value="sold">Sold</option>
                            </select>
                          </td>
                          <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                            <button 
                              className="btn-secondary" 
                              onClick={() => handleStartEdit(item)}
                              style={{ padding: '6px 12px', fontSize: '0.72rem', marginRight: '8px' }}
                            >
                              Edit Details
                            </button>
                          </td>
                        </tr>

                        {editingItemId === item.id && (
                          <tr>
                            <td colSpan="6" style={{ padding: '20px', background: '#fcfbfa', borderBottom: '1px solid var(--border-color)' }}>
                              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '20px' }}>
                                  <div className="form-group">
                                    <label className="form-label">Commission Rate (%)</label>
                                    <input 
                                      type="number" 
                                      className="form-control" 
                                      value={editRate} 
                                      onChange={(e) => setEditRate(e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="form-label">Broker Assessment Note</label>
                                    <textarea 
                                      rows="2"
                                      className="form-control"
                                      value={editNote}
                                      onChange={(e) => setEditNote(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                  <button className="btn-secondary" onClick={() => setEditingItemId(null)} style={{ padding: '6px 14px', fontSize: '0.78rem' }}>Cancel</button>
                                  <button className="btn-gold" onClick={() => handleSaveEdit(item.id)} style={{ padding: '6px 14px', fontSize: '0.78rem' }}>Save Changes</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
