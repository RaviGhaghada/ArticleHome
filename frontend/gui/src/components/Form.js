import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

class CustomForm extends React.Component {

    handleFormSubmit(event) {
        event.preventDefault();

    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleFormSubmit.bind(this)} layout='vertical'>
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
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

export default CustomForm;