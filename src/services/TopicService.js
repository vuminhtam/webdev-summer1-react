let _singleton = Symbol();
const SERVER_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const TOPIC_API_URL = SERVER_URL + '/api/topic';
const TOPIC_LESSON_URL = SERVER_URL + '/api/course/CID/module/MID/lesson/LID/topic'


export default
class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    findTopicById(id) {
        return fetch(TOPIC_API_URL + '/' + id)
            .then(function(response){
                return response.json();
            });
    }

    findAllTopics() {
        return fetch(TOPIC_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllTopicForLesson(cid, mid, lid) {
        return fetch(TOPIC_LESSON_URL.replace('CID', cid).replace('MID', mid).replace('LID', lid))
            .then(function(response){
                return response.json();
            });
    }

    createTopic(cid, mid, lid, topic) {
        console.log({cid, mid, lid})
        var url = TOPIC_LESSON_URL.replace('CID', cid).replace('MID', mid).replace('LID', lid)
        return fetch(url, {
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteTopic(id) {
        return fetch(TOPIC_API_URL + '/' + id, {
            method: 'DELETE'
        })
    }

}
