import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Lost from './containers/LostPage';

const BaseRouter = () => {
    return (
        <Switch>
            <Route exact path='/' component={ArticleList} />
            <Route exact path='/articles/:articleID' component={ArticleDetail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route path="*" component={Lost}></Route>
        </Switch>
    )
}

export default BaseRouter;