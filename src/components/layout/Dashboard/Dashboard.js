import React from 'react';
import Clients from '../../clients/Clients/Clients';
import Sidebar from '../Sidebar/Sidebar';

import './Dashboard.css';

export default () => {
  return (
    <div className="dashboard">
      <div className="dash--clients">
        <Clients />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  )
}