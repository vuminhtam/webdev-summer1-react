let _singleton = Symbol();
const TOPIC_API_URL = 'http://localhost:8080/api/topic';
const TOPIC_LESSON_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic'


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
        console.log(JSON.stringify(topic));
        return fetch(TOPIC_LESSON_URL.replace('CID', cid).replace('MID', mid).replace('LID', lid), {
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
