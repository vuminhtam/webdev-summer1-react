import React from 'react';

export default class ModuleItem
    extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li className="list-group-item">
                {this.props.info.title}

                <span className="float-right">
                        <button onClick={() =>
                        {this.props.delete(this.props.info.id)}}
                                className="btn btn-outline-dark">
                        <i className="fa fa-trash"></i>
                        </button>
                </span>
            </li>
        );
    }
}
