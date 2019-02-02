import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner/Spinner';
import './EditClient.css';

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.inputNome = React.createRef();
    this.inputSobrenome = React.createRef();
    this.inputEmail = React.createRef();
    this.inputFone = React.createRef();
    this.inputSaldo = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;
    const updateClient = {
      nome: this.inputNome.current.value,
      sobrenome: this.inputSobrenome.current.value,
      email: this.inputEmail.current.value,
      fone: this.inputFone.current.value,
      saldo: this.inputSaldo.current.value === '' ? 0 : this.inputSaldo.current.value
    }

    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(() => history.push('/'))
      .catch(err => console.log(err))
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        {client ?
          <section>
            <div>
              <Link to="/">
                Voltar ao Dash
          </Link>
            </div>

            <div>
              <div>Adicionar Cliente</div>
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-item">
                    <label htmlFor="nome">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      minLength="3"
                      required
                      defaultValue={client.nome}
                      ref={this.inputNome}
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input
                      type="text"
                      name="sobrenome"
                      minLength="3"
                      defaultValue={client.sobrenome}
                      ref={this.inputSobrenome}
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={client.email}
                      ref={this.inputEmail}
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="fone">Fone</label>
                    <input
                      type="text"
                      name="fone"
                      minLength="6"
                      defaultValue={client.fone}
                      ref={this.inputFone}
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="saldo">Saldo</label>
                    <input
                      type="text"
                      name="saldo"
                      defaultValue={client.saldo}
                      ref={this.inputSaldo}
                    />
                  </div>
                  <input type="submit" value="Enviar" />
                </form>
              </div>
            </div>
          </section> :
          <Spinner />
        }
      </div>
    )
  }
}
EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
}
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);