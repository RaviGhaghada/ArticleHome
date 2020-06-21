import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { LikeOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            liked: false,
            likes: 0
        }
    }

    getLikeDetail(props) {
        if (props.token && props.articleID) {
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

        axios.get(`http://${process.env.REACT_APP_API_HOST}/api/${props.articleID}/likes/`)
            .then(res => {
                this.setState({
                    likes: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });

    }


    componentDidMount() {
        this.getLikeDetail(this.props);
    }
    componentWillReceiveProps(newProps) {
        this.getLikeDetail(newProps);
    }


    toggleLike() {
        if (this.props.token !== null) {
            axios.post(`http://${process.env.REACT_APP_API_HOST}/api/${this.props.articleID}/togglelike/`).then(res => {
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

        return (
            <Button onClick={this.toggleLike.bind(this)} icon={<LikeOutlined />}>
                {this.state.liked ?
                    `You and `
                    :
                    ''
                }
                {`${this.state.likes - 1} people like this`}
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