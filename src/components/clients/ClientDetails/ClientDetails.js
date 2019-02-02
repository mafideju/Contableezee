import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../../layout/Spinner/Spinner';
import './ClientDetails.css';
// import { firestore } from 'firebase';

class ClientDetails extends Component {
  render() {
    const { client } = this.props;

    return (
      <section className="client-details">
        {client ?
          <div>
            <div>
              <Link to="/">
                Voltar ao Dash
              </Link>
            </div>
            <div>
              <Link to={`/client/edit/${client.id}`}>
                Editar
              </Link>
              <button>
                Delete
              </button>
            </div>
            <div className="client-details--header">
              Nome: <h3 style={{ display: 'inline' }}>{client.nome} {client.sobrenome}</h3>
            </div>
            <div className="client-details--body">
              Email: <h4 style={{ display: 'inline' }}>{client.email}</h4>
            </div>
            <div>
              Fone: <h4 style={{ display: 'inline' }}>{client.fone}</h4>
            </div>
            <div>
              Saldo:
              <h4 style={{ display: 'inline' }}>
                <span
                  className={classnames({
                    'saldo-lucro': client.saldo > 0,
                    'saldo-preju': client.saldo === 0
                  })}
                >
                  R$ {parseFloat(client.saldo).toFixed(2)}
                </span>
              </h4>
            </div>
          </div> :
          <Spinner />
        }
      </section>
    )
  }
}
ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
}
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);