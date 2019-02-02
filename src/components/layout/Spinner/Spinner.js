import React from 'react';
import spinner from './spinnerTenor.gif';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="bg-spinner">
      <img src={spinner} alt="Carregando..." />
    </div>
  )
}
export default Spinner;