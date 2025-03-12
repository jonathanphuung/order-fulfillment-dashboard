// src/app/api/orders/route.js
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request) {
  // Fetch all orders from the "orders" table
  const { data, error } = await supabase.from('orders').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  // Parse the incoming JSON payload
  const body = await request.json();

  // Insert the data into the "orders" table (adjust field names as needed)
  const { data, error } = await supabase.from('orders').insert([body]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}



export async function POST(request) {
  // Delete all rows in the orders table
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .neq('id', null); // This condition effectively deletes every row

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'All orders cleared', data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}