import React, { Component } from 'react'
import { getFromStorage } from '../storage'

export default class Principal extends Component {

    constructor() {
        super()
        this.state = {
            set: false,
            value: '',
            user_id: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit() {
        // if principal already set, update it, else make a new one
        console.log(this.state.set)
        if (this.state.set) {
            fetch('/principal/update', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    user_id: getFromStorage('user'),
                    value: this.state.value
                })
            })
            .then(res => {
                window.location = "/"
            })
        } else {
            fetch('/principal/add', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    user_id: getFromStorage('user'),
                    value: this.state.value
                })
            })
            .then(res => {
                window.location = "/"
            })
        }
    }

    componentDidMount() {
        fetch('/principal?user_id=' + getFromStorage('user'), {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res) {
                this.setState({
                    value: res.value,
                    set: true
                })
            }
        })
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-secondary" onClick={this.handleSubmit}>Set Principal</button>
            </div>
        )
    }

}