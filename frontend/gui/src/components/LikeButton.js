import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { LikeOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            liked: false
        }
    }

    liked(articleID) {
        axios.get(`http://${process.env.REACT_APP_API_HOST}:8000/api/${articleID}/liked/`)
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

    componentDidMount() {
        if (this.props.token && this.props.articleID) {
            this.liked(this.props.articleID);
        }

    }
    componentWillReceiveProps(newProps) {
        if (newProps.token && newProps.articleID) {
            this.liked(newProps.articleID);
        }
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
        console.log(this.props);
        return (
            <Button onClick={this.toggleLike.bind(this)} icon={<LikeOutlined />}>
                {!this.state.liked ?
                    "Like?"
                    :
                    "Liked!"
                }
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