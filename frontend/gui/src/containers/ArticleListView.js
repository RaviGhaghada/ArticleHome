import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Articles from './../components/Article'
import CustomForm from './../components/Form'

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class ArticleList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    articles: res.data
                })
            });
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
                <hr />
                <h2> Create an article </h2>
                <CustomForm requestType="post" articleID={null} btnText="Create" />
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(ArticleList);