import React from 'react'
import { Link } from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap-tabs';

export default
class CourseTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse bg-light">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">
                                <h2>{this.props.title}: {this.props.name}</h2>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}
