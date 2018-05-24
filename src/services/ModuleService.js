let _singleton = Symbol();
const SERVER_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'

const COURSE_MODULE_API_URL = SERVER_URL + '/api/course/CID/module'
const MODULE_API_URL = SERVER_URL + '/api/module/MID'


export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        console.log(JSON.stringify(module))
        return fetch(COURSE_MODULE_API_URL.replace('CID', courseId), {
            body: JSON.stringify(module),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findModuleById(moduleID) {
        return fetch(
            MODULE_API_URL
                .replace('MID', moduleID))
            .then(function (response) {
                return response.json();
            })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            COURSE_MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    deleteModule(moduleId) {
        return fetch(
            MODULE_API_URL.replace('MID', moduleId), {
            method: 'delete'
        })
    }

}
