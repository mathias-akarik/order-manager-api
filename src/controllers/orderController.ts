import { Request, Response } from 'express';
import { Order } from '../models/order';

// Sample in-memory orders
let orders: Order[] = [];

// Create a new order
export const createOrder = (req: Request, res: Response) => {
  const { userDetails, items }: { userDetails: any, items: any[] } = req.body;

  // Ensure necessary fields are provided
  if (!userDetails || !items || items.length === 0) {
    return res.status(400).json({ message: 'User details and items are required' });
  }

  const newOrder: Order = {
    id: (orders.length + 1).toString(),  // Use string IDs for consistency (e.g., UUIDs)
    userDetails,
    items,
    status: 'Order Received',  // Default status
    createdAt: new Date().toISOString()  // Add a createdAt timestamp
  };

  orders.push(newOrder);  // Add the new order to in-memory storage
  res.status(201).json(newOrder);  // Return the created order
};

// Get an order by ID and simulate order status based on time elapsed
export const getOrderById = (req: Request, res: Response) => {
  const { id } = req.params;

  // Ensure id is a string, if it's an array, take the first element
  const orderId = Array.isArray(id) ? id[0] : id;

  // Parse the order ID to an integer (IDs are now strings)
  const parsedId = parseInt(orderId, 10);

  if (isNaN(parsedId)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  const order = orders.find(order => order.id === parsedId.toString());

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Simulate the status based on the time elapsed since order was created
  const createdTime = new Date(order.createdAt).getTime();
  const now = Date.now();
  const diffSeconds = (now - createdTime) / 1000; // Difference in seconds

  let currentStatus: 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered' = order.status;

  // Adjusted thresholds for quick testing (in seconds)
  if (diffSeconds > 30) {
    currentStatus = 'Delivered';  // If more than 30 seconds, mark as 'Delivered'
  } else if (diffSeconds > 15) {
    currentStatus = 'Out for Delivery';  // If more than 15 seconds, mark as 'Out for Delivery'
  } else if (diffSeconds > 5) {
    currentStatus = 'Preparing';  // If more than 5 seconds, mark as 'Preparing'
  } else {
    currentStatus = 'Order Received';  // If still less than 5 seconds, keep 'Order Received'
  }

  // Ensure that status is always a valid value
  if (!['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'].includes(currentStatus)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  // Update order status
  order.status = currentStatus;

  res.status(200).json(order);  // Return the order with updated status
};

// Update an existing order status
export const updateOrderStatus = (req: Request, res: Response) => {
  const { id, status } = req.body;

  // Validate input
  if (!id || !status) {
    return res.status(400).json({ message: 'Order ID and status are required' });
  }

  // Validate status before assigning
  if (!['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  // Find the order by ID
  const order = orders.find(order => order.id === id);

  // If the order doesn't exist
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Update the order status
  order.status = status;
  res.status(200).json(order);  // Return the updated order
};

// Get all orders, but exclude 'Delivered' ones
export const getAllOrders = (req: Request, res: Response) => {
  // Filter out orders that have been delivered
  const nonDeliveredOrders = orders.filter(order => order.status !== 'Delivered');
  res.status(200).json(nonDeliveredOrders);  // Return only non-delivered orders
};
