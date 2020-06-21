import React from 'react';
import { Form, Input, Button, message } from 'antd';

import axios from 'axios';
import { connect } from 'react-redux';

class CustomForm extends React.Component {

    async handleFormSubmit(event, requestType, articleID) {
        event.preventDefault();

        const elements = event.target.elements;
        const title = elements.title.value;
        const description = elements.description.value;
        const content = elements.content.value;

        if (this.props.token !== null) {
            switch (requestType) {
                case 'post':
                    await axios.post(`http://${process.env.REACT_APP_API_HOST}/api/`, {
                        title: title,
                        description: description,
                        content: content
                    }).then(res => {
                        this.props.history.push('/');
                        this.forceUpdate();
                    }).catch(err => console.log(err));
                    break;
                case 'put':
                    await axios.put(`http://${process.env.REACT_APP_API_HOST}/api/${articleID}/`, {
                        title: title,
                        description: description,
                        content: content
                    }).then(res => {
                        this.props.history.push('/');
                        this.forceUpdate();
                    }).catch(err => console.log(err));
                    break;
            }
        }
        else {
            message.destroy()
            message.error("Not logged in");
        }

    }
    render() {
        return (
            <div>
                <Form onSubmitCapture={event => this.handleFormSubmit(event, this.props.requestType, this.props.articleID)} layout='vertical'>
                    <Form.Item label="Title" name="title">
                        <Input placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder="Write a description" />
                    </Form.Item>
                    <Form.Item label="Content" name="content">
                        <Input placeholder="Enter some content" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(CustomForm);