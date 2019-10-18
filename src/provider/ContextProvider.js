import React, { Component } from 'react'
import Context from '../config/Context' ; 
export default class ContextProvider extends Component {

    constructor(){
        super() ; 
        this.state = {
            phone : '5' , 
            token : ''
        }
    }

    grabDataFromApi(){
        this.setState({phone : 'phone from Context'})
    }
    changeToken = (token) => {
        this.setState({token})
    }

    changePhone=(phone) => this.setState({phone})

    componentWillMount(){
        this.grabDataFromApi() ; 
    }
    render() {
        return (
            <Context.Provider value = {{phone : this.state.phone , changePhone : this.changePhone}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
