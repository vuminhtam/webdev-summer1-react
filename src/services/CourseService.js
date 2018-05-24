let _singleton = Symbol();
const REMOTE_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
const COURSE_API_URL = REMOTE_URL + '/api/course';
const COURSE_USER_URL = REMOTE_URL + '/api/user/UID/course'


export default
class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCoursesByUID(uid) {
        return fetch(COURSE_USER_URL.replace('UID', uid))
            .then(function(response){
                return response.json();
            });
    }


    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findCourseByID(courseID) {
        return fetch(COURSE_API_URL + '/' + courseID)
            .then(function(response){
                return response.json();
            });
    }


    createCourse(course) {
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    createCourseForUser(course) {
        return fetch(COURSE_USER_URL.replace('UID', course.uid), {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'DELETE'
            })
    }

}
