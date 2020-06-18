import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';

import * as actions from '../store/actions/auth';

class Login extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;
        const username = elements.username.value;
        const password = elements.password.value;
        this.props.onAuth(username, password)
    }
    render() {

        if (this.props.error) {
            message.error(this.props.error.message);
        }
        return (
            <div>
                {
                    this.props.loading ?

                        <Spin />

                        :

                        <Form initialValues={{ remember: true }} layout='vertical' onSubmitCapture={this.handleSubmit.bind(this)}>
                            <Form.Item style={{ marginLeft: 10 }}

                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Username' name='username' />
                            </Form.Item>

                            <Form.Item style={{ marginLeft: 10 }}
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Password' name='password' />
                            </Form.Item>

                            <Form.Item style={{ marginLeft: 15 }}>
                                <Button type="primary" htmlType="submit">
                                    Login
                    </Button>
                    &nbsp;Or&nbsp;
                    <NavLink to='/signup'>
                                    Signup
                    </NavLink>
                            </Form.Item>
                        </Form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);