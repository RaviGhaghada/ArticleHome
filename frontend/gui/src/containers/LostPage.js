import React from 'react';

import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default class LostPage extends React.Component {

    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><Link to='/'>Back to Home</Link></Button>}
                />
            </div>
        )
    }
}