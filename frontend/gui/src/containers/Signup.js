import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem name="username" label="Username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                    <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                </FormItem>

                <FormItem name="email" label="E-mail" rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}>

                    <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />

                </FormItem>

                <FormItem name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' },]} hasFeedback>
                    <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                </FormItem>

                <FormItem name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                    rules={[{
                        required: true, message: 'Please confirm your password!',
                    }, ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        }
                    })]}>
                    <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Signup
        </Button>
        Or
        <NavLink
                        style={{ marginRight: '10px' }}
                        to='/login/'> login
        </NavLink>
                </FormItem>

            </Form >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);