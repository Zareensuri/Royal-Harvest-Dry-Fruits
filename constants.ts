
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Almonds',
    category: 'Almonds',
    description: 'Crunchy, nutritious, and naturally rich in protein and healthy fats. Carefully selected for maximum freshness.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=1200',
    sizes: ['250g', '500g', '1kg'],
    benefits: ['High in protein', 'Brain booster', 'Heart healthy']
  },
  {
    id: '2',
    name: 'Royal Cashews',
    category: 'Cashews',
    description: 'Creamy, crunchy, and premium-grade cashews imported for quality lovers in Canada.',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&q=80&w=1200',
    sizes: ['250g', '500g', '1kg'],
    benefits: ['Energy boosting', 'Rich in minerals', 'Zero cholesterol']
  },
  {
    id: '3',
    name: 'Luxury Pistachios',
    category: 'Pistachios',
    description: 'Perfectly roasted and lightly salted pistachios. A vibrant and healthy snack for any time of day.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=1200',
    sizes: ['250g', '500g', '1kg'],
    benefits: ['Antioxidant rich', 'Good for eyes', 'Fiber source']
  },
  {
    id: '4',
    name: 'Golden Walnuts',
    category: 'Walnuts',
    description: 'Premium light-colored walnut halves. Rich in Omega-3 fatty acids for superior brain health.',
    price: 21.00,
    image: 'https://images.unsplash.com/photo-1541830209424-69931885664a?auto=format&fit=crop&q=80&w=1200',
    sizes: ['250g', '500g', '1kg'],
    benefits: ['Omega-3 rich', 'Improves mood', 'Great for baking']
  },
  {
    id: '5',
    name: 'Medjool Dates',
    category: 'Dates',
    description: 'Large, soft, and sweet "King of Dates". Naturally caramel-like flavor, perfect for healthy sweet cravings.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1596701062351-be5f8a41f417?auto=format&fit=crop&q=80&w=1200',
    sizes: ['500g', '1kg'],
    benefits: ['Natural sweetener', 'High fiber', 'Energy surge']
  },
  {
    id: '6',
    name: 'Premium Gift Box',
    category: 'Gift Boxes',
    description: 'A beautifully packed assortment of premium dry fruits—perfect for Eid, weddings, and corporate gifts.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200',
    sizes: ['Standard', 'Luxury'],
    benefits: ['Elegant packaging', 'Customizable', 'Perfect for gifting']
  }
];

export const CATEGORIES = ['All', 'Almonds', 'Cashews', 'Pistachios', 'Walnuts', 'Dates', 'Gift Boxes'];
