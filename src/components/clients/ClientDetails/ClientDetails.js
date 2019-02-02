import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../../layout/Spinner/Spinner';
import './ClientDetails.css';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    newBalanceAmount: ''
  }

  onDeleteHandler = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'))
      .catch(err => console.log(err))
  }

  onChangeHandler = e => this.setState({ [e.target.nome]: e.target.value });

  balanceSubmitHandler = e => {
    e.preventDefault();
    // UNDEFINED WHAT FUCK ZONE
    // console.log('AMOUNT 2', this.state.undefined)
    // const { undefined } = this.state;

    const { client, firestore } = this.props;
    const clientUpdate = {
      saldo: parseFloat(this.state.undefined)
    }
    firestore
      .update({ collection: 'clients', doc: client.id }, clientUpdate)
      .then(() => {
        this.setState({
          showBalanceUpdate: false
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { client } = this.props;
    const { showBalanceUpdate } = this.state;
    // let balanceForm = '';
    // if (showBalanceUpdate) {
    //   balanceForm =
    //     <form onSubmit={this.balanceSubmitHandler}>
    //       <div>
    //         <input
    //           type="text"
    //           name='balanceUpdateAmount'
    //           placeholder='Modificar Saldo'
    //           defaultValue={balanceUpdateAmount}
    //           onChange={this.onChange}
    //         />
    //       </div>
    //       <div><input type="submit" value="Saldo" /></div>
    //     </form>
    // } else {
    //   balanceForm = null
    // }

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
              <button onClick={this.onDeleteHandler}>
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
              <small>
                <a href="#!" onClick={() => this.setState({
                  showBalanceUpdate: !this.state.showBalanceUpdate
                })}>{' '}muda</a>
              </small>
              {/* {console.log('BALANCE AMOUNT => ', newBalanceAmount)} */}
              {showBalanceUpdate ?
                <form onSubmit={this.balanceSubmitHandler}>
                  <div>
                    <input
                      type="text"
                      name='balanceUpdateAmount'
                      placeholder='Modificar Saldo'
                      defaultValue=""
                      // ref={this.input}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Saldo" />
                  </div>
                </form> : null
              }
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