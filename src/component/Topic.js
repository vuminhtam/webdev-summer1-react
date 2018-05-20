import React from 'react'
import { Link } from 'react-router-dom'

export default
class Topic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" href="#">{this.props.info.title}</a>
                <span className="float-right">
                        <i className="fa fa-remove" onClick={() =>
                        {this.props.delete(this.props.info.id)}}></i>
                </span>
            </li>
        );
    }
}
