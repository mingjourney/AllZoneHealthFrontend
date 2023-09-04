import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../page/Login/Login'
import AdminApp from '../page/AdminApp/AdminApp'
import LearnerApp from "../page/LearnerApp/LearnerApp"
import ArticleDetail from '../page/LearnerApp/article-learning/ArticleDetail'
import ArticleList from '../page/LearnerApp/article-learning/ArticleList'
import AudioList from '../page/LearnerApp/audio-learning/AudioList'
import VideoList from '../page/LearnerApp/video-learning/VideoList'
import Register from '../page/Register/Register'

const PrivateRoute = ({ component: Component, ...rest }) => (
  
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  
  export default function IndexRouter() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} />
          <Route path="/article-learning" component={ArticleList} exact />
          <Route path="/audio-learning" component={AudioList} exact />
          <Route path="/video-learning" component={VideoList} exact />
          <Route path="/article-learning/detail/:id" component={ArticleDetail} />
          <PrivateRoute path="/admin" component={AdminApp}/>
          <Route path="/" component={LearnerApp}/>
          <Route path="*" component={Login} />
        </Switch>
      </HashRouter>
    );
  }