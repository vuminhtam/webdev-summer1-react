import React, {Component} from 'react';
import CourseCard from "../component/CourseCard";
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import CourseEditor from "./CourseEditor";
import {BrowserRouter as Router} from 'react-router-dom'

export default
class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>
                    <CourseEditor/>
                    <div className="card-deck">
                        <CourseCard/>
                        <CourseCard/>
                        <CourseCard/>
                    </div>
                </div>
            </Router>
        )
    }
}