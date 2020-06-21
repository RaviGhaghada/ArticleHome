import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { LikeOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.tokenValue = -1;
        this.state = {
            liked: false,
            likes: 0,
        }
    }

    getLikeDetail(props) {
        if (props.articleID) {
            if (props.token) {
                axios.get(`http://${process.env.REACT_APP_API_HOST}/api/${props.articleID}/liked/`)
                    .then(res => {
                        this.setState({
                            liked: res.data
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            }
            else {
                this.setState({
                    liked: false
                })
            }
            axios.get(`http://${process.env.REACT_APP_API_HOST}/api/${props.articleID}/likes/`)
                .then(res => {
                    this.setState({
                        likes: res.data
                    });
                })
                .catch(err => {
                    console.log();
                });

        }
    }
    componentDidMount() {
        if (this.tokenValue != this.props.token) {
            this.tokenValue = this.props.token;
            this.getLikeDetail(this.props);
        }
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            this.tokenValue = this.props.token;
            this.getLikeDetail(this.props);
        }
    }


    toggleLike() {
        if (this.props.token !== null) {
            axios.post(`http://${process.env.REACT_APP_API_HOST}/api/${this.props.articleID}/togglelike/`).then(res => {
                this.getLikeDetail(this.props);
            }).catch(err => {
                console.log(err);
            });
        } else {
            message.destroy()
            message.error("Not logged in");
        }
    }


    render() {

        var message = ""

        if (this.state.liked) {
            message = "You and " + (this.state.likes - 1) + " people like this";
        }
        else {
            message = this.state.likes + " people like this";
        }
        return (
            <Button onClick={this.toggleLike.bind(this)} icon={<LikeOutlined />}>
                {message}
            </Button>
        );
    }

}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(LikeButton);