import React, {Component} from 'react'
import Topic from "../component/Topic";
import ModuleService from "../services/ModuleService";
import TopicService from "../services/TopicService";

export default
class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.topicService = TopicService.instance;
        this.state = {
            topics: []
        };
    }


    componentDidMount() {
        if(!this.isEmpty(this.props)){
            var cid = this.props.match.params.cid;
            var mid = this.props.match.params.mid;
            var lid = this.props.match.params.lid;
            this.findTopicsForLesson(cid, mid, lid)
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps)){
            var cid = newProps.match.params.cid;
            var mid = newProps.match.params.mid;
            var lid = newProps.match.params.lid;
            this.findTopicsForLesson(cid, mid, lid)
        }
    }


    findTopicsForLesson(cid, mid, lid) {
        this.topicService
            .findAllTopicForLesson(cid, mid, lid)
            .then((topics) => {this.setTopics(topics)});
    }

    setTopics(list) {
        this.setState({topics: list})
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

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
