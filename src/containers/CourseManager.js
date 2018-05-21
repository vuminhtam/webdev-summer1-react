import React from 'react';
import CourseEditor from "./CourseEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseList from "./CourseList";

export default
class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="container-fluid">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                            <a className="navbar-brand" href="/courses">Assignment 2</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="https://webdev-summer1-2018-tamvu.herokuapp.com/">
                                            Assignment 1
                                            <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                            id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        User
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button">Profile</button>
                                        <button className="dropdown-item" type="button">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        <Route path="/courses"
                               component={CourseList}>
                        </Route>

                        <Route path="/course/:id"
                               component={CourseEditor}>
                        </Route>

                    </div>
                </div>

            </Router>
        )
    }
}