let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080/api/lesson';
const LESSON_MODULE_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson'


export default
class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    findLessonById(id) {
        return fetch(LESSON_API_URL + '/' + id)
            .then(function(response){
                return response.json();
            });
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllLessonsForModule(cid, mid) {
        return fetch(LESSON_MODULE_URL.replace('CID', cid).replace('MID', mid))
            .then(function(response){
                return response.json();
            });
    }

    createLesson(lesson) {
        return fetch(LESSON_API_URL, {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(id) {
        console.log('delete lesson')
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'DELETE'
        })
    }

}
