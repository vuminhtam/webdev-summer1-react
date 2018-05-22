import React from 'react'
import Lesson from "../component/Lesson";
import LessonService from "../services/LessonService";
import TopicList from "./TopicList";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseCard from "../component/CourseCard";
import { Redirect } from 'react-router-dom'

export default
class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirected: false,
            inputLesson: {
                title: ''
            },
            lessons: []
        }

        this.lessonService = LessonService.instance;
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

    }

    componentDidMount() {
        if(!this.isEmpty(this.props) && this.props.courseId !== "" && this.props.moduleId !== ""){
            this.findLessonForModule(this.props.courseId, this.props.moduleId)
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps) && newProps.courseId !== "" && newProps.moduleId !== ""){
            this.findLessonForModule(newProps.courseId, newProps.moduleId)
        }
    }

    findLessonForModule(cid, mid) {
        this.lessonService
            .findAllLessonsForModule(cid, mid)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    titleChanged(event) {
        this.setState({inputLesson:
                {title: event.target.value}
        });
    }


    deleteLesson(id) {
        this.lessonService
            .deleteLesson(id)
            .then(() => {
                this.findLessonForModule(this.props.courseId, this.props.moduleId)
            });
    }


    createLesson() {
        this.lessonService
            .createLesson(
                this.props.courseId,
                this.props.moduleId,
                this.state.inputLesson)
            .then(() => {
                this.findLessonForModule(this.props.courseId, this.props.moduleId)
            });

    }

    renderLessonTabs() {
        var self = this;
        let lessons = this.state.lessons.map(function (lesson) {
            return <Lesson key={lesson.id}
                           info={lesson}
                           courseId={self.props.courseId}
                           moduleId={self.props.moduleId}
                           delete={self.deleteLesson}/>
        });
        return lessons;
    }

    render() {
        return (
            <Router>
            <div>
                {this.redirect()}
                <ul className="nav nav-tabs" id="myTab">
                    {this.renderLessonTabs()}
                    <li className="nav-item">
                        <a className="nav-link disabled">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                       placeholder="New lesson"
                                       onChange={this.titleChanged}></input>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default"
                                        onClick={this.createLesson}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <ul>
                    <Route path="/course/:cid/module/:mid/lesson/:lid"
                           component={TopicList}>
                    </Route>
                </ul>

                <ul>
                    <Route path="/course/:cid/module/:mid/lesson/:lid/topic/:tid"
                           component={CourseCard}>
                    </Route>
                </ul>
            </div>
            </Router>
    );}

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    redirect() {

        if(!this.state.redirected) {
            if(this.state.lessons.length > 0) {
                this.setState({redirected: true})
                return <Redirect to={this.redirectLink()}></Redirect>
            }
        }
    }

    redirectLink() {
        return `/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.state.lessons[0].id}`
    }

}