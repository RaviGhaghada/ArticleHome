import React from 'react';
import axios from 'axios';

import { Card } from 'antd';
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
            })
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
            </div>
        );
    }
}

export default ArticleDetail;