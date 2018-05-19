import React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


import CourseManager from "./containers/CourseManager";
import ModuleItem from "./component/ModuleItem";
import ModuleList from "./containers/ModuleList";

ReactDOM.render(
    <div>
        <CourseManager/>
    </div>,
    document.getElementById('root')
);
