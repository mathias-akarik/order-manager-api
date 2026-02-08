// In Memory Order Model
export interface Order {
  id: string;
  userDetails: {
    name: string;
    address: string;
    phone: string;
  };
  items: Array<{ menuItemId: number; quantity: number }>;
  status: 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';  // Added 'Delivered'
  createdAt: string;
}
