import React from 'react';
import CourseService from "../services/CourseService";
import CourseRow from "../component/CourseRow";

export default
class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            course: {title: '', name: ''},
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
                    <div className="container">
                        <h2 className="text-center text-uppercase text-secondary mb-0">
                            List of Courses
                        </h2>
                    </div>
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
            var str = this.state.course.title;
            var res = str.split(":");
            if(res.length != 2) {
                alert("Create a course under format title:name")
            }
            else {
                this.setState({
                    course: { title: res[0], name: res[1] }
                });
                this.courseService
                    .createCourse({ title: res[0], name: res[1] })
                    .then(() => { this.findAllCourses(); });
            }
        }
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => { this.findAllCourses(); });
    }

}
