import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


import CourseManager from "./containers/CourseManager";
import CourseList from "./containers/CourseList";

ReactDOM.render(
    <div>
        <CourseList/>
        <CourseManager/>
    </div>,
    document.getElementById('root')
);
