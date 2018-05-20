import React from 'react'
import { Link } from 'react-router-dom'
import ModuleService from "../services/ModuleService";
import TopicService from "../services/TopicService";

export default
class Topic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <Link to={`/course/${this.props.params.cid}/module/${this.props.params.mid}/lesson/${this.props.params.lid}/topic/${this.props.info.id}`}>
                    <a className="nav-link">{this.props.info.title}</a>
                </Link>
                <span className="float-right">
                        <i className="fa fa-remove" onClick={() =>
                        {this.props.delete(this.props.info.id)}}></i>
                </span>
            </li>
        );
    }
}
