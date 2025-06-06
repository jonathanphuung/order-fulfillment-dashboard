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
          customer: newOrder.customer,
        }),
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg">
          Order Fulfillment Dashboard
        </h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* Add New Order Section */}
        <section className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl transition hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Order</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Order Name */}
            <div className="sm:col-span-2">
              <label className="block text-lg font-medium text-gray-700">Order Name</label>
              <input
                type="text"
                value={newOrder.name}
                onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter order name"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0"
                required
              />
            </div>

            {/* Customer Name */}
            <div className="sm:col-span-3">
              <label className="block text-lg font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter customer name"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold tracking-wide hover:bg-indigo-700 transition-colors"
              >
                Add Order
              </button>
            </div>
          </form>
        </section>

        {/* Orders List Section */}
        <section className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl transition hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h2>
          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 border border-gray-200 rounded-2xl hover:shadow-xl transition-shadow bg-white"
                >
                  <h3 className="text-2xl font-bold text-gray-800">{order.name}</h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Quantity:</span> {order.quantity}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Customer:</span> {order.customer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}