import React, {Component} from 'react'
import ModuleItem from "../component/ModuleItem";
import ModuleService from "../services/ModuleService";
import Topic from "../component/Topic";

export default
class TopicList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    <Topic/>
                    <Topic/>
                    <Topic/>
                </ul>
            </div>
        )
    }

}
