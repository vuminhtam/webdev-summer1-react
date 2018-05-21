import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.info.id}`}>
                       {this.props.info.title}: {this.props.info.name}
                    </Link>
                </td>
                <td>
                    <span className="float-right">
                        <button onClick={() =>
                        {this.props.delete(this.props.info.id)}}
                                className="btn btn-outline-dark">
                        <i className="fa fa-remove"></i>
                        </button>
                    </span>

                </td>
            </tr>

        )
    }
}
export default CourseRow;
