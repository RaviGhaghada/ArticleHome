import React from 'react';
import { Form, Input, Button } from 'antd';

import axios from 'axios';

class CustomForm extends React.Component {

    async handleFormSubmit(event, requestType, articleID) {
        event.preventDefault();

        const elements = event.target.elements;
        const title = elements.title.value;
        const description = elements.description.value;
        const content = elements.content.value;

        switch (requestType) {
            case 'post':
                await axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    description: description,
                    content: content
                }).then(res => console.log(res)).catch(err => console.log(err));
                break;
            case 'put':
                await axios.put(`http://127.0.0.1:8000/api/${articleID}`, {
                    title: title,
                    description: description,
                    content: content
                }).then(res => console.log(res)).catch(err => console.log(err));
                break;
        }

    }
    render() {
        return (
            <div>
                <Form onSubmitCapture={event => this.handleFormSubmit(event, this.props.requestType, this.props.btnText)} layout='vertical'>
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

export default CustomForm;