import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crud.css';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log("API_URL-->",import.meta.env.VITE_API_URL);
export default function CRUD() {
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); // ✅ Runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { firstName, lastName, email };
      if (editId) {
        await axios.put(`${API_URL}/items/${editId}`, data);
      } else {
        await axios.post(`${API_URL}/items`, data);
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setEditId(null);
      fetchItems(); // ✅ Refetch after update/add
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setEditId(item._id);
  };

  return (
    <div className="container">
      <h1>MongoDB CRUD App</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No records found</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
