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
                {this.props.info.title}: {this.props.info.name}
                </td>
                <td>
                    <button onClick={() =>
                    {this.props.delete(this.props.info.id)}}
                            className="btn btn-dark">
                    <i className="fa fa-remove"></i>
                    </button>
                </td></tr>
        )
    }
}
export default CourseRow;
