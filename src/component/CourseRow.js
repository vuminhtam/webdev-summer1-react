import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {cid:'', mid:'', lid:'', tid:''}
    }

    setParam(props) {
        var param = props.info
        this.setState({cid: param.id})
        var modules = param.modules;
        if(modules.length > 0) {
            this.setState({mid: modules[0].id})
            var lessons = modules[0].lessons
            if(lessons.length > 0) {
                this.setState({lid: lessons[0].id})
                var topics = lessons[0].topics
                if(topics.length > 0) {
                    this.setState({tid: topics[0].id})
                }
            }
        }
    }

    componentDidMount() {
        this.setParam(this.props)
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
                    Owned by {this.getOwner()}
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

    getOwner() {
        return this.props.info.owner.username
    }
}
export default CourseRow;
