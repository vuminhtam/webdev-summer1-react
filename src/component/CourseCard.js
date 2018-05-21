import React from 'react'
import TopicService from "../services/TopicService";

export default class CourseCard extends React.Component {
    constructor(props) {
        super(props);
        this.topicService = TopicService.instance;
        this.state = {
            title:'',
            content:''
        }
    }

    componentDidMount() {
        if(!this.isEmpty(this.props)){
            this.getContent(this.props.match.params.tid)
            this.render()
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps)){
            this.getContent(newProps.match.params.tid)
            this.render()
        }
    }

    getContent(id) {
        this.topicService
            .findTopicById(id)
            .then((topicInfo) => {
                this.setState({content: topicInfo.content});
                this.setState({title: topicInfo.title})
            });
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        return (
        <div class="alert alert-success">
            <h3>{this.state.title}</h3>
            <p>empty content</p>
        </div>
        )
    }
}

