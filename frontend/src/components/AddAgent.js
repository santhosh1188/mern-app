import React, { useState } from 'react';
import axios from 'axios';

const AddAgent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/agents', { name, email, mobile, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Agent added successfully');
    } catch (err) {
      setMessage('Error adding agent');
    }
  };

  return (
    <div className="mb-5">
      <h3>Add Agent</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Mobile (with country code)</label>
          <input type="text" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="btn btn-primary">Add Agent</button>
      </form>
    </div>
  );
};

export default AddAgent;