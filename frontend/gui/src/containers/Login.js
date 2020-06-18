import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';


class Login extends React.Component {

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                        <Spin />

                        :

                        <Form initialValues={{ remember: true }}>
                            <Form.Item
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Login
                    </Button>
                    Or
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

export default connect(mapStateToProps)(Login);