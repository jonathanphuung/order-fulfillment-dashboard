// src/app/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ name: '', quantity: '' });

  // Fetch orders from API
  async function fetchOrders() {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle form submission to add a new order
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newOrder.name,
        quantity: Number(newOrder.quantity),
      }),
    });
    const data = await res.json();
    console.log('Added order:', data);
    // Clear the form and refresh orders list
    setNewOrder({ name: '', quantity: '' });
    fetchOrders();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Fulfillment Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Order Name</label>
          <input
            type="text"
            value={newOrder.name}
            onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Order
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-2">Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border p-2 my-2">
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}