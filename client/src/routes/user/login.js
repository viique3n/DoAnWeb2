import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        //this.setState({value: event.target.value});
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const { userEmail, userPassword } = this.state;
        const user = {
            userEmail,
            userPassword,
        }
    
        axios
            .post('http://localhost:9000/login', user)
            .then(res => {
                if (res.data.redirect == '/') {
                    window.location = "/";
                } else if (res.data.redirect == '/login'){
                    window.location = "/login";
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return ([
            <Form className="col-sm-4" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="userEmail" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="userPassword" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        ]);
    };
};

export default LoginForm;