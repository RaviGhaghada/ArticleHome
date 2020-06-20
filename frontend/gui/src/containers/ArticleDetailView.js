import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { Redirect } from 'react-router-dom';

import CustomForm from './../components/Form'

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            article: []
        }
    }

    componentWillReceiveProps(newProps) {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
            .then(res => {
                this.setState({
                    article: res.data
                })
            });
    }


    handleDelete(event) {

        event.preventDefault();

        if (this.props.token !== null) {
            const articleID = this.state.article.id;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                "Authorization": this.props.token
            }
            console.log(axios.defaults.headers);
            axios.post(`http://127.0.0.1:8000/api/${articleID}/like/`);
            //            this.props.history.push('/');
            //          this.forceUpdate();
        }

    }
    render() {
        // if (this.props.token == null) {
        //     return <Redirect to="/login" />
        // }
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

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(ArticleDetail);