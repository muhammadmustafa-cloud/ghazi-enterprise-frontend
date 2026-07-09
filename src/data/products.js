export const categories = [
  { id: 'new-box', name: 'New Carton Boxes' },
  { id: 'old-box', name: 'Used Carton Boxes' },
  { id: 'tape', name: 'Packaging Tape' }
];

export const products = [
  {
    id: 'nb-001',
    name: 'Standard Moving Box',
    category: 'new-box',
    price: 150, // PKR
    bulkPricing: [
      { minQty: 100, price: 135 },
      { minQty: 500, price: 120 }
    ],
    dimensions: '18x18x18 inch',
    ply: '3-ply',
    material: 'Kraft Corrugated',
    condition: 'New',
    images: [
      '/new-boxes.png'
    ],
    stock: 5000,
    description: 'A standard 18-inch cubical carton box. Ideal for shipping moderately heavy items. Manufactured with high-quality Kraft paper for extra durability.',
    customizable: true
  },
  {
    id: 'nb-002',
    name: 'Heavy Duty Industrial Box',
    category: 'new-box',
    price: 350,
    bulkPricing: [
      { minQty: 50, price: 320 },
      { minQty: 200, price: 300 }
    ],
    dimensions: '24x24x24 inch',
    ply: '5-ply',
    material: 'Heavy Duty Corrugated',
    condition: 'New',
    images: [
      '/new-boxes.png'
    ],
    stock: 2000,
    description: 'Double-wall 5-ply construction for maximum protection. Best for industrial parts, heavy electronics, or fragile bulk items.',
    customizable: true
  },
  {
    id: 'ob-001',
    name: 'Recycled Medium Box',
    category: 'old-box',
    price: 60,
    bulkPricing: [
      { minQty: 100, price: 50 }
    ],
    dimensions: '16x16x16 inch',
    ply: '3-ply',
    material: 'Recycled Corrugated',
    condition: 'Used - Good',
    images: [
      '/used-boxes.png'
    ],
    stock: 1200,
    description: 'Used once, perfectly intact and ready for resale. A cost-effective solution for moving or internal factory storage.',
    customizable: false
  },
  {
    id: 'tp-001',
    name: 'Clear Packing Tape',
    category: 'tape',
    price: 120,
    bulkPricing: [
      { minQty: 50, price: 100 },
      { minQty: 200, price: 85 }
    ],
    dimensions: '2 inch x 50 yards',
    ply: 'N/A',
    material: 'BOPP',
    condition: 'New',
    images: [
      '/tape.png'
    ],
    stock: 10000,
    description: 'Strong adhesive transparent tape. Perfect for sealing all types of carton boxes. Tear-resistant and long-lasting.',
    customizable: true // Can be customized with logo
  },
  {
    id: 'tp-002',
    name: 'Brown Kraft Tape',
    category: 'tape',
    price: 150,
    bulkPricing: [
      { minQty: 50, price: 130 },
      { minQty: 200, price: 110 }
    ],
    dimensions: '2.5 inch x 50 yards',
    ply: 'N/A',
    material: 'Kraft Paper',
    condition: 'New',
    images: [
      '/tape.png'
    ],
    stock: 5000,
    description: 'Eco-friendly brown paper tape with strong adhesion. Blends perfectly with carton boxes for a seamless look.',
    customizable: true
  }
];

export const plyOptions = ['3-ply', '5-ply', '7-ply'];
