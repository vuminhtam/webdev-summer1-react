let _singleton = Symbol();
const SERVER_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'

const LESSON_API_URL = SERVER_URL + '/api/lesson';
const LESSON_MODULE_URL = SERVER_URL + '/api/course/CID/module/MID/lesson'


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

    createLesson(cid, mid, lesson) {
        console.log(JSON.stringify(lesson));
        return fetch(LESSON_MODULE_URL.replace('CID', cid).replace('MID', mid), {
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
