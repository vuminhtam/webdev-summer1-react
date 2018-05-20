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
                <a className="nav-link" href="#">Topic</a>
            </li>
        );
    }
}
