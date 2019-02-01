import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// import PropTypes from 'prop-types';

class Clients extends Component {

  render() {
    const clients = this.props.clients;

    console.log('PROPS =>', this.props.clients)
    return (
      <div>
        {clients ?
          <div>
            Lista de Clientes
          <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.nome} {client.sobrenome}</td>
                    <td>{client.email}</td>
                    <td>R${parseFloat(client.saldo).toFixed(2)}</td>
                    <td>
                      <Link to={`/client/${client.id}`}>Mais</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> :
          <h1>Carregannnnnnn.......do!</h1>}
      </div>
    )
  }
}
export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);