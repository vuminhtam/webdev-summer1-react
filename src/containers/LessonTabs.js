import React from 'react'
import Lesson from "../component/Lesson";
import LessonService from "../services/LessonService";

export default
class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }

        this.lessonService = LessonService.instance;
        this.deleteLesson = this.deleteLesson.bind(this);
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

    deleteLesson(id) {
        this.lessonService
            .deleteLesson(id)
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
