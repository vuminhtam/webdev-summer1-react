import React from 'react'
import { Link } from 'react-router-dom'

export default
class Lesson extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.info.id}`}>
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        {this.props.info.title}
                    </a>
                </li>
            </Link>
        );
    }
}
