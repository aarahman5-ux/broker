import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    image: '/images/hero_car_banner.png',
    category: 'Featured Lineup',
    title: 'Supra, NSX & Swift',
    indicator: 'Exclusive Collection',
    price: 'Flat 2.5% Sourcing'
  },
  {
    image: '/images/toyota_supra.png',
    category: 'Toyota',
    title: 'GR Supra White Edition',
    indicator: 'Available Now',
    price: '$68,500 Est.'
  },
  {
    image: '/images/honda_nsx.png',
    category: 'Honda',
    title: 'NSX Slate Hybrid Coupe',
    indicator: 'Available Now',
    price: '$182,000 Est.'
  },
  {
    image: '/images/suzuki_swift.png',
    category: 'Suzuki',
    title: 'Swift Crimson Red',
    indicator: 'Available Now',
    price: '$28,900 Est.'
  },
  {
    image: '/images/mercedes_g63.png',
    category: 'Mercedes-AMG',
    title: 'G63 Matte Black SUV',
    indicator: 'Acquired / Private Sale',
    price: '$179,000 Est.'
  }
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovered) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          ),
        4000
      );
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovered]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Widget 1: Sourced Info */}
      <div 
        key={`widget1-${currentIndex}`}
        style={{
          position: 'absolute',
          top: '-15px',
          right: '10px',
          padding: '12px 18px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-premium)',
          animation: 'floatCard 8s infinite ease-in-out, widgetFade 0.4s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5
        }}
      >
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: currentIndex === 4 ? '#ef4444' : '#059669', 
          boxShadow: currentIndex === 4 ? '0 0 10px #ef4444' : '0 0 10px #059669' 
        }} />
        <div>
          <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.5px' }}>
            {slides[currentIndex].category}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {slides[currentIndex].title}
          </div>
        </div>
      </div>

      {/* Floating Widget 2: Pricing/Status */}
      <div 
        key={`widget2-${currentIndex}`}
        style={{
          position: 'absolute',
          bottom: '-15px',
          left: '10px',
          padding: '12px 18px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-premium)',
          animation: 'floatCard 10s infinite ease-in-out -3s, widgetFade 0.4s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          background: 'rgba(60, 156, 210, 0.12)',
          border: '1px solid var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'var(--accent-gold-dark)', fontSize: '0.7rem', fontWeight: '800' }}>$</span>
        </div>
        <div>
          <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.5px' }}>
            {slides[currentIndex].indicator}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {slides[currentIndex].price}
          </div>
        </div>
      </div>

      {/* Primary Framed Image Showcase */}
      <div 
        style={{
          width: '100%',
          height: '350px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-premium)',
          overflow: 'hidden',
          background: '#ffffff',
          padding: '12px',
          transform: isHovered ? 'rotate(0deg)' : 'rotate(-1.5deg)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          position: 'relative'
        }}
        className="hero-image-frame"
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Slides Track */}
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {slides.map((slide, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  flexShrink: 0,
                  position: 'relative' 
                }}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(30, 37, 43, 0.25) 0%, transparent 65%)'
                }} />
              </div>
            ))}
          </div>

          {/* Navigation Chevrons */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, background-color 0.2s ease, visibility 0.3s',
              color: 'var(--text-primary)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, background-color 0.2s ease, visibility 0.3s',
              color: 'var(--text-primary)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Indicators Dots */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                style={{
                  width: currentIndex === idx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: currentIndex === idx ? 'var(--accent-gold-dark)' : 'rgba(255, 255, 255, 0.6)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes widgetFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default HeroSlider;
