
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
