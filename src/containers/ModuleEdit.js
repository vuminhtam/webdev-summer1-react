import React from 'react';
import ModuleService from "../services/ModuleService";
import LessonTabs from "./LessonTabs";
import TopicList from "./TopicList";
export default
class ModuleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            title: 'none'
        };

        this.moduleService = ModuleService.instance;

        //declare functions
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    //init course and module ID
    componentDidMount() {
        if(!this.isEmpty(this.props)){
            this.setCourseId(this.props.match.params.courseId);
            this.setModuleId(this.props.match.params.moduleId);
            this.setTitle(this.state.moduleId);
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps)){
            this.setCourseId(newProps.match.params.courseId);
            this.setModuleId(newProps.match.params.moduleId);
            this.setTitle(this.state.moduleId);
        }
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setTitle(moduleId) {
        if(moduleId != "") {
            this.moduleService
                .findModuleById(moduleId)
                .then((moduleInfo) => {
                    this.setState({title: moduleInfo.title});
                });
        }
    }


    render() {
        return (
            <div>
                <LessonTabs
                    courseId={this.state.courseId}
                    moduleId={this.state.moduleId}/>
                <TopicList/>
            </div>

        )
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
