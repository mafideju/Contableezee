import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner/Spinner';
import './Clients.css';

class Clients extends Component {
  state = {
    totalOwed: null
  }

  static getDerivedStateFromProps = (props, state) => {
    const { clients } = props;
    if (clients) {
      // console.log('SALDO =>', clients)
      const total = clients.reduce((total, client) => {
        return parseFloat(total) + parseFloat(client.saldo.toString());
      }, 0);
      return { totalOwed: total }
    } else {
      return null;
    }
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    return (
      <div>
        {clients ?
          <section>
            <div className="clients--header">
              <div className="clients--header__title">
                Lista de Clientes
              </div>
              <div className="clients--header__sum">
                <div>
                  Total{' '}
                </div>
                <span>
                  R${parseFloat(totalOwed).toFixed(2)}
                </span>
              </div>
            </div>
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
          </section> :
          <Spinner />}
      </div>
    )
  }
}
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}
export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);