'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ name: '', quantity: '', customer: '' });
  const [loading, setLoading] = useState(false);

  // Fetch orders from API
  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle form submission to add a new order
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newOrder.name,
          quantity: Number(newOrder.quantity),
          customer: newOrder.customer
        })
      });
      const data = await res.json();
      console.log('Added order:', data);
      setNewOrder({ name: '', quantity: '', customer: '' });
      fetchOrders();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Order Fulfillment Dashboard
        </h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <section className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Order</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Item</label>
              <input
                type="text"
                value={newOrder.name}
                onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter order name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Order
              </button>
            </div>
          </form>
        </section>
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {orders.map((order) => (
                <div key={order.id} className="p-4 border rounded hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold">{order.name}</h3>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Customer: {order.customer}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}