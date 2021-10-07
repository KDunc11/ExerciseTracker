import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeNewUsername = this.onChangeNewUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            newUsername: '',
            users: []
        };
    }

    componentDidMount() {
        axios 
            .get('http://localhost:5000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeNewUsername(e) {
        this.setState({
            newUsername: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.newUsername
        };

        console.log(user);

        const res = await axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user);

        console.log(res);
        /*axios
            .post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
            .then(res => console.log(res.data))*/

        window.location = '/users';
    }

    render() {
        return (
            <div>
                <h3>Edit Users</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select 
                            ref='userInput'
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return (
                                            <option 
                                                key={user}
                                                value={user}
                                            >
                                                    {user}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                    </div>
                    <div className='form-group'>
                        <label>New Username: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.newUsername}
                            onChange={this.onChangeNewUsername}
                        />
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Update' className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}
