export const defaultInventory = [
  {
    id: "apt-1",
    category: "apartments",
    title: "Skyline Penthouse Loft",
    description: "Ultra-modern penthouse featuring 360-degree skyline views, double-height ceilings, a private glass pool, and premium smart automation throughout.",
    price: 3450000,
    commissionRate: 2.5,
    brokerNote: "Exceptional modern design. I personally toured this listing and negotiated a direct-to-broker price limit. Ideal for high-net-worth buyers looking for privacy.",
    status: "available",
    image: "penthouse",
    specs: {
      "Location": "Downtown Metropolis",
      "Area": "4,200 sq ft",
      "Bedrooms": "3",
      "Bathrooms": "3.5",
      "Floor": "42nd",
      "Year Built": "2025"
    },
    sellerInfo: {
      name: "Marcus Vance",
      phone: "+1 (555) 019-2834",
      email: "marcus@vanceholdings.com",
      dateSubmitted: "2026-05-12"
    }
  },
  {
    id: "car-1",
    category: "cars",
    title: "Porsche 911 GT3 RS",
    description: "Finished in bespoke Paint-to-Sample Crayon with Weissach Package. Active aerodynamics, lightweight carbon fiber monocoque parts, and track-ready suspension calibration.",
    price: 312000,
    commissionRate: 4.0,
    brokerNote: "Single-owner collector vehicle with complete service records. Hard to find in this spec. Sourced directly from a private garage in Stuttgart.",
    status: "available",
    image: "porsche",
    specs: {
      "Year": "2024",
      "Mileage": "1,240 mi",
      "Engine": "4.0L Flat-6",
      "Transmission": "7-Speed PDK",
      "Color": "PTS Crayon",
      "Power": "518 hp"
    },
    sellerInfo: {
      name: "Elena Rostova",
      phone: "+49 89 201938",
      email: "e.rostova@icloud.com",
      dateSubmitted: "2026-06-01"
    }
  },
  {
    id: "apt-2",
    category: "apartments",
    title: "Waterfront Cliffside Villa",
    description: "An architectural masterpiece carved directly into the seaside cliffs. Features private elevator to the beach, infinity pool merging with the ocean, and floor-to-ceiling glass facades.",
    price: 7800000,
    commissionRate: 2.0,
    brokerNote: "Off-market listing. A truly unique piece of real estate. Full discretion requested for prospective buyer tours.",
    status: "under_contract",
    image: "villa",
    specs: {
      "Location": "Amalfi Coast, Italy",
      "Area": "6,500 sq ft",
      "Bedrooms": "5",
      "Bathrooms": "6",
      "Amenities": "Beach access, Pool",
      "Year Built": "2023"
    },
    sellerInfo: {
      name: "Giovanni Rossi",
      phone: "+39 02 8374 9283",
      email: "rossi.giovanni@rossi-estates.it",
      dateSubmitted: "2026-04-22"
    }
  },
  {
    id: "car-2",
    category: "cars",
    title: "Ferrari SF90 Stradale",
    description: "Assetto Fiorano specification hybrid hypercar. Exterior in Rosso Corsa with black roof, carbon fiber racing seats, and titanium exhaust system.",
    price: 545000,
    commissionRate: 4.5,
    brokerNote: "Currently stored in climate-controlled facility. Fully inspected by Ferrari technicians. We assist with global delivery and tax clearance.",
    status: "available",
    image: "ferrari",
    specs: {
      "Year": "2023",
      "Mileage": "850 mi",
      "Engine": "4.0L Twin-Turbo V8 Hybrid",
      "Transmission": "8-Speed Dual-Clutch",
      "Color": "Rosso Corsa",
      "Power": "986 hp"
    },
    sellerInfo: {
      name: "Klaus Werner",
      phone: "+41 44 928 3829",
      email: "kwerner@swisswealth.ch",
      dateSubmitted: "2026-05-30"
    }
  },
  {
    id: "custom-1",
    category: "custom",
    title: "Riva 56' Rivale Yacht",
    description: "Stunning open cruiser combining sporty elegance with absolute luxury. Twin MAN V8 1200 engines, custom mahogany finishes, and state-of-the-art stabilizers.",
    price: 1890000,
    commissionRate: 3.5,
    brokerNote: "Meticulously maintained yacht, stored indoors during winters. Custom interior upgrades. Complete harbor berth lease option in Monaco available.",
    status: "available",
    image: "yacht",
    specs: {
      "Type": "Luxury Motor Yacht",
      "Length": "56 feet (17.2m)",
      "Engines": "Twin MAN V8 1200hp",
      "Max Speed": "38 knots",
      "Cabins": "3 Guest + 1 Crew",
      "Year": "2022"
    },
    sellerInfo: {
      name: "Arthur Pendelton",
      phone: "+33 6 1234 5678",
      email: "arthur@pendelton-yachts.mc",
      dateSubmitted: "2026-06-05"
    }
  },
  {
    id: "custom-2",
    category: "custom",
    title: "Audemars Piguet Royal Oak Double Balance Wheel",
    description: "Openworked Royal Oak ref 15407OR in 18-carat pink gold. Features the stunning double balance wheel mechanism visible from both sides.",
    price: 145000,
    commissionRate: 5.0,
    brokerNote: "Delivered as a full set (box, papers, warranty). Sourced from an established VIP collector client. Pristine unpolished condition.",
    status: "sold",
    image: "watch",
    specs: {
      "Brand": "Audemars Piguet",
      "Model": "Royal Oak Double Balance",
      "Reference": "15407OR.OO.1220OR.01",
      "Material": "18k Pink Gold",
      "Case Size": "41mm",
      "Condition": "Mint / Unworn"
    },
    sellerInfo: {
      name: "Sophia Chen",
      phone: "+852 9182 7364",
      email: "sophia.chen@hkluxury.com",
      dateSubmitted: "2026-04-10"
    }
  }
];

export const mockLeads = [
  {
    id: "lead-1",
    type: "inquiry",
    itemId: "car-1",
    itemTitle: "Porsche 911 GT3 RS",
    clientName: "David Cole",
    clientEmail: "david@cole-cap.com",
    clientPhone: "+1 (555) 438-9201",
    message: "Interested in the PTS Crayon Porsche. Is it possible to arrange a private viewing in Los Angeles next Thursday? I have pre-approved funds.",
    status: "unread",
    date: "2026-06-13"
  },
  {
    id: "lead-2",
    type: "sourcing",
    clientName: "Amara Adebayo",
    clientEmail: "amara@adebayodesign.com",
    clientPhone: "+234 803 123 4567",
    details: {
      assetType: "Apartment",
      targetBudget: 4500000,
      description: "Looking for a modern duplex or penthouse in London (Kensington or Chelsea) with a large terrace and private parking. Ready to move quickly."
    },
    message: "Seeking a premium London real estate broker to source off-market properties. Budget is flexible up to 5M GBP.",
    status: "in_progress",
    date: "2026-06-12"
  },
  {
    id: "lead-3",
    type: "listing",
    clientName: "Viktor Vancamp",
    clientEmail: "viktor.v@vancamp-logistics.be",
    clientPhone: "+32 475 92 81 02",
    details: {
      category: "cars",
      title: "Lamborghini Aventador SVJ Roadster",
      description: "Ad Personam Viola Pasifae exterior, carbon details, 2,800 km, pristine condition. Fully optioned.",
      targetPrice: 620000
    },
    message: "I want to list my SVJ Roadster with your brokerage. Please review the details and advise on your commission rates.",
    status: "pending_review",
    date: "2026-06-14"
  }
];
