import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button, message } from 'antd';

import CustomForm from './../components/Form'

import { LikeOutlined } from '@ant-design/icons';

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
        axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            })
            .then(() => {
                console.log(this.props.token);
                if (this.props.token !== null) {
                    axios.get(`http://127.0.0.1:8000/api/${articleID}/liked/`)
                        .then(res => {
                            console.log(res.data)
                            this.setState({
                                liked: res.data
                            })
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                }
            });
    }


    handleDelete(event) {

        event.preventDefault();

        if (this.props.token !== null) {
            const articleID = this.state.article.id;
            axios.delete(`http://127.0.0.1:8000/api/${articleID}/`);
            this.props.history.push('/');
            this.forceUpdate();
        } else {
            message.destroy()
            message.error("Not logged in");
        }

    }

    toggleLike() {
        if (this.props.token !== null) {
            const articleID = this.state.article.id;
            axios.post(`http://127.0.0.1:8000/api/${articleID}/togglelike/`).then(res => {
                this.setState({
                    liked: !this.state.liked
                })
            }).catch(err => {
                console.log(err);
            });
        } else {
            message.destroy()
            message.error("Not logged in");
        }
    }
    render() {
        const Like = (
            <div>
                <Button onClick={this.toggleLike.bind(this)} icon={<LikeOutlined />}>
                    {this.state.liked ?
                        "Like?"
                        :
                        "Liked!"
                    }
                </Button>
            </div>
        )
        const Title = (
            <div>
                <div style={{ float: "left" }}>{this.state.article.title}</div>
                <div style={{ float: "right" }}>{Like}</div>
            </div>
        );

        return (
            <div>
                <Card title={Title}>
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