import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends Component {
  state = {
    nome: '',
    sobrenome: '',
    email: '',
    fone: '',
    saldo: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;

    if (newClient.saldo === '') {
      newClient.saldo = 0;
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'))
      .catch(err => console.log(err))
  }

  render() {
    return (
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
                  onChange={this.onChange}
                  value={this.state.nome}
                />
              </div>

              <div className="form-item">
                <label htmlFor="sobrenome">Sobrenome</label>
                <input
                  type="text"
                  name="sobrenome"
                  minLength="3"
                  onChange={this.onChange}
                  value={this.state.sobrenome}
                />
              </div>

              <div className="form-item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-item">
                <label htmlFor="fone">Fone</label>
                <input
                  type="text"
                  name="fone"
                  minLength="6"
                  onChange={this.onChange}
                  value={this.state.fone}
                />
              </div>

              <div className="form-item">
                <label htmlFor="saldo">Saldo</label>
                <input
                  type="text"
                  name="saldo"
                  onChange={this.onChange}
                  value={this.state.saldo}
                />
              </div>
              <input type="submit" value="Enviar" />
            </form>
          </div>
        </div>
      </section>
    )
  }
}
AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
}
export default firestoreConnect()(AddClient);