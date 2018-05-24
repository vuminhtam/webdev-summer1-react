import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
        <CourseManager/>
    </div>
    </Router>,
    document.getElementById('root')
);
