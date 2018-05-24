import React from 'react';
import Route, Router from 'react-router'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import CourseManager from "./containers/CourseManager";
import NavBar from "./component/Navbar";
import CourseList from "./containers/CourseList";

ReactDOM.render(
    <Router>
    <div>
        <NavBar/>
        <Route path="/uid/:uid"
               component={CourseList}>
        </Route>
        <CourseManager/>
    </div>
    </Router>,
    document.getElementById('root')
);
