import React from 'react'
import TopicService from "../services/TopicService";

export default class CourseCard extends React.Component {
    constructor(props) {
        super(props);
        this.topicService = TopicService.instance;
        this.state = {
            id: '',
            title:'',
            content:''
        }
        this.setTID = this.setTID.bind(this)
        this.WIDGET_URL = "https://arcane-shore-13623.herokuapp.com/"
            + "topic/" + this.props.match.params.tid + "/widget"
    }


    componentDidMount() {
        if(!this.isEmpty(this.props)){
            this.setTID(this.props.match.params.tid)
            this.getContent(this.props.match.params.tid)
            this.render()
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps)){
            this.setTID(newProps.match.params.tid)
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
        <div>
            <a href={this.WIDGET_URL}>
                <i className="fas fa-external-link-alt"></i>
            </a> <h3>{this.state.title}</h3>
            <div dangerouslySetInnerHTML={this.iframe()} />
        </div>
        )
    }

    setTID(id) {
        this.setState({id: id})
        this.WIDGET_URL = "https://arcane-shore-13623.herokuapp.com/"
            + "topic/" + this.state.id + "/widget"
    }

    iframe() {
        return {
            __html: '<iframe src= ' +
           this.WIDGET_URL + ' width="100%" height="1000"></iframe>'
        }
    }
}
