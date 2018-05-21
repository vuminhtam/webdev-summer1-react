import React from 'react'
import { Link } from 'react-router-dom'

export default
class Lesson extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.info.id}`}>
                    <li className="nav-item">
                        <a className="nav-link active">
                            [{this.props.info.id}]{this.props.info.title}
                        </a>
                    </li>
                </Link>
                <span className="float-right">
                        <i className="fa fa-remove" onClick={() =>
                        {this.props.delete(this.props.info.id)}}></i>
                </span>
            </div>

        );
    }
}
