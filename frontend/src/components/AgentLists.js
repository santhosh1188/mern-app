import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentLists = () => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLists(res.data);
      } catch (err) {
        setError('Error fetching lists');
      }
    };
    fetchLists();
  }, []);

  return (
    <div>
      <h3>Distributed Lists</h3>
      {error && <p className="text-danger">{error}</p>}
      {lists.map((list) => (
        <div key={list._id} className="mb-3">
          <h4>Agent: {list.agentId.name}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Phone</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {list.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.firstName}</td>
                  <td>{item.phone}</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AgentLists;