import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default
class ModuleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirected: false}
    }

    render() {
        return (
            <div>
                {this.redirect()}
                <li className="list-group-item">
                    <Link to={`/course/${this.props.courseId}/module/${this.props.info.id}`}>
                        Module {this.props.order} - {this.props.info.title}
                        </Link>

                <span className="float-right">
                        <button onClick={() =>
                        {this.props.delete(this.props.info.id)}}
                                className="btn btn-outline-dark">
                        <i className="fa fa-trash"></i>
                        </button>
                </span>
                </li>
            </div>
        );
    }

    selected() {
        console.log(this.props.order + 'selected')
    }

    redirect() {
        if(this.props.selected && !this.state.redirected) {
            this.setState({redirected: true})
            return <Redirect to={this.redirectLink()}></Redirect>
        }
    }

    redirectLink() {
        return `/course/${this.props.courseId}/module/${this.props.info.id}`
    }
}
