import React from 'react';
import axios from 'axios';

import { Card, Button } from 'antd';
import CustomForm from './../components/Form'

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            article: []
        }
    }

    componentDidMount() {
        // see: src/routes.js
        const articleID = this.props.match.params.articleID;
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => {
                this.setState({
                    article: res.data
                })
            });
    }

    handleDelete(event) {
        event.preventDefault();

        const articleID = this.state.article.id;
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <hr />
                <h2>Edit article</h2>
                <CustomForm requestType="put" articleID={this.state.article.id} btnText="Update" />
                <form onSubmit={this.handleDelete.bind(this)}>
                    <Button type='danger' htmlType="submit">Delete</Button>
                </form>
            </div>
        );
    }
}

export default ArticleDetail;