import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';

import * as actions from '../store/actions/auth';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {

    handleFinish(values) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push('/');
    }


    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        else if (this.props.token) {
            this.props.history.push('/');
        }
        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                        <Spin />

                        :

                        <Form onFinish={this.handleFinish.bind(this)} className="login-form">
                            <FormItem name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            </FormItem>

                            <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Login
                      </Button>
                      Or
                      <NavLink
                                    style={{ marginRight: '10px' }}
                                    to='/signup/'> signup
                      </NavLink>
                            </FormItem>
                        </Form>
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        state: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);