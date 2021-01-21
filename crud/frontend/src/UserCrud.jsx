import React, { Component } from 'react';
import axios from 'axios';
import Main from './Main';

const HeaderProps = {

    icon: 'users',
    title: 'Users',
    subtitle: 'User Register: Include, List, Change and Exclude. '
}

const initialState = {
    user: { name: '', email: '' },
    // Lista local com TODO o banco de dados
    // Note que nao devemos fazer isto.
    list: []
}

const baseUrl = 'http://localhost:3001/users'


export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // Limpa o formulario, apenas o user
    clear() {
        this.setState({ user: initialState.user })
    }


    save() {

        // Verificar se o id ja foi setado:
        // Isso significa que eu vou alterar(put) ou criar(post)
        // Note que qualquer valor de id diferente de zero é 'true'
        // A notacao axios[method] é alternativa a axios.method
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user).then(resp => {
            const list = this.getUpdatedList(resp.data);
            this.clear();
            this.setState({ list })
        })
    }


    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }
    

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    renderForm() {

        return (
            <div className="form">
                <div className="column">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>

                <hr/>
                
                <div className="row">
                    <div className="col-12 d-flex justify-content-end" onClick={e=>this.save(e)}>
                        <button className="btn btn-primary">
                            Save
                        </button>                        
                        <button className="btn btn-secondary ml-2" onClick={e=>this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>

            </div>


        )
    }


    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (

            <Main {...HeaderProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

}