import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button, message } from 'antd';

import CustomForm from './../components/Form'

import { LikeOutlined } from '@ant-design/icons';
import LikeButton from '../components/LikeButton';

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            article: [],
            liked: false
        }
    }

    componentWillMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://${process.env.REACT_APP_API_HOST}/api/${articleID}/`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            });
    }


    handleDelete(event) {

        event.preventDefault();

        if (this.props.token !== null) {
            const articleID = this.state.article.id;
            axios.delete(`http://${process.env.REACT_APP_API_HOST}:8000/api/${articleID}/`);
            this.props.history.push('/');
            this.forceUpdate();
        } else {
            message.destroy()
            message.error("Not logged in");
        }

    }

    render() {


        return (
            <div>
                <Card title={(
                    <div>
                        <div style={{ float: "left" }}>{this.state.article.title}</div>
                        <div style={{ float: "right" }}><LikeButton articleID={this.state.article.id} /></div>
                    </div>
                )}>
                    <p>{this.state.article.content}</p>
                </Card >
                <hr />
                <h2>Edit article</h2>
                <CustomForm requestType="put" articleID={this.state.article.id} btnText="Update" />
                <form onSubmit={this.handleDelete.bind(this)}>
                    <Button type='danger' htmlType="submit">Delete</Button>
                </form>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(ArticleDetail);