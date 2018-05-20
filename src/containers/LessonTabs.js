import React from 'react'
import Lesson from "../component/Lesson";
import LessonService from "../services/LessonService";

export default
class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    componentWillReceiveProps() {
        if(!this.isEmpty(this.props) && this.props.courseId != "" && this.props.moduleId != ""){
            this.findLessonForModule(this.props.courseId, this.props.moduleId)
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
        console.log(event.target.value)
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
            <div>
                <ul className="nav nav-tabs">
                    {this.renderLessonTabs()}
                    <li className="nav-item">
                        <a className="nav-link disabled">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                       placeholder="New lesson title"
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

            </div>
    );}

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
