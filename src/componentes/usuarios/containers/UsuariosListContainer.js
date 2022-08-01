// import { List } from '@material-ui/core';
import React, { Component } from 'react';
import { fetchConToken } from '../../helpers/fetch';
import List from '../Components/List'

class UsuariosListContainer extends Component {

    state = {
        usuario:[]
    }
    componentDidMount(){
        const resp = await fetchConToken('events');
        const { usuarios } = await resp.json();
        // console.log(usuarios)

        this.setState({
            usuario: usuarios
        })
    }

    render() {
        const { usuario } = this.state;
        return (
            <List usuario={usuario}  />
            // <h2></h2>

        );
    }
}

export default UsuariosListContainer;