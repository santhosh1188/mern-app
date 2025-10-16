import React from 'react';
import AddAgent from './AddAgent';
import UploadCSV from './UploadCSV';
import AgentLists from './AgentLists';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <AddAgent />
      <UploadCSV />
      <AgentLists />
    </div>
  );
};

export default Dashboard;