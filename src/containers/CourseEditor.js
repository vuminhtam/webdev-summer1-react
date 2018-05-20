import React from 'react'
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";

export default
class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: ''};
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.id);
    }

    selectCourse(courseId) {
        this.setState({id: courseId});
    }

    render() {
        return (
        <div>
            <h2>Editing course: {this.state.id}</h2>
            <div className="row">
                <div className="col-4">
                    <ModuleList courseId={this.state.id}/>
                </div>
                <div className="col-8">
                    <LessonTabs/>
                </div>
            </div>
        </div>
    );}}
