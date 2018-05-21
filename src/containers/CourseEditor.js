import React from 'react'
import ModuleList from "./ModuleList";
import ModuleEdit from "./ModuleEdit";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseService from "../services/CourseService";


export default
class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            name:''
        };
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.id);
    }

    selectCourse(courseId) {
        this.setState({id: courseId});
        this.courseService
            .findCourseByID(courseId)
            .then((courseInfo) => {
                this.setState({
                    title: courseInfo.title,
                    name: courseInfo.name});
            });
    }

    render() {
        return (
            <Router>
                <div>

                    <nav className="navbar navbar-inverse bg-light">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand">
                                    <h2>{this.state.title}: {this.state.name}</h2>
                                </a>
                            </div>
                        </div>
                    </nav>

                    <div className="row">
                        <div className="col-4">
                            <ModuleList courseId={this.state.id}/>
                        </div>
                        <div className="col-8">
                            <Route path="/course/:courseId/module/:moduleId"
                                   component= {ModuleEdit}/>
                        </div>
                    </div>
                </div>
            </Router>
    );}}
