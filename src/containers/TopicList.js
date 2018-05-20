import React, {Component} from 'react'
import Topic from "../component/Topic";
import ModuleService from "../services/ModuleService";
import TopicService from "../services/TopicService";

export default
class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
              cid:'', mid:'', lid:''
            },
            input: {
                title: ''
            },
            topics: []
        };

        this.topicService = TopicService.instance;
        this.createTopic = this.createTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    setParams(params) {
        this.setState({params: params})
    }

    componentDidMount() {
        if(!this.isEmpty(this.props)){
            this.setParams(this.props.match.params);
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
            .then((topics) => {
                this.setTopics(topics)});
    }

    setTopics(list) {
        this.setState({topics: list})
    }

    renderList() {
        var self = this;
        let res = this.state.topics.map(function (one) {
            return <Topic key={one.id}
                          info={one}
                          delete={self.deleteTopic}/>
        });
        return res;
    }

    titleChanged(event) {
        this.setState({input:
                {title: event.target.value}
        });
    }

    deleteTopic(id) {
        this.topicService
            .deleteTopic(id)
            .then(() => {
                this.findTopicsForLesson(this.state.params.cid, this.state.params.mid, this.state.params.lid)
            });
    }

    createTopic() {
        if(this.state.input.title != "") {
            this.topicService
                .createTopic(
                    this.state.params.cid,
                    this.state.params.mid,
                    this.state.params.lid,
                    this.state.input)
                .then(() => {
                    this.findTopicsForLesson(this.state.params.cid, this.state.params.mid, this.state.params.lid)
                });
        }
        else {
            alert("Please enter topic title")
        }
    }

    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    {this.renderList()}
                    <li className="nav-item">
                        <a className="nav-link disabled">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                       placeholder="New topic"
                                       onChange={this.titleChanged}></input>
                                <div className="input-group-btn">
                                    <button className="btn btn-default"
                                            onClick={this.createTopic}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </li>
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
