import React from 'react';
import CourseService from "../services/CourseService";
import CourseRow from "../component/CourseRow";

export default
class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            course: { title: "" },
            courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses()
    }

    renderCourseRows() {
        let courses = null;
        var self = this;
        if(this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      info={course}
                                      delete={self.deleteCourse}/>
                }
            )
        }
        return (
            courses
        )
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th><input onChange={this.titleChanged}
                                   className="form-control" id="titleFld"
                                   placeholder="Enter a course title ie CS1800"/></th>
                        <th><button onClick={this.createCourse}
                                    className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                        </button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }

    createCourse() {
        if(this.state.course.title === "") {
            alert("Please enter course title");
        }
        else {
            this.courseService
                .createCourse(this.state.course)
                .then(() => { this.findAllCourses(); });
        }
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => { this.findAllCourses(); });
    }

}
