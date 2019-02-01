import React from 'react';
import Clients from '../../clients/Clients';
import Sidebar from '../Sidebar/Sidebar';

import './Dashboard.css';

export default () => {
  return (
    <div className="dashboard">
      <div className="dash--clients">
        <Clients />
      </div>
      <Sidebar />
    </div>
  )
}