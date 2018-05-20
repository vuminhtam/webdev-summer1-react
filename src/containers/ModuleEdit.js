import React from 'react';
import ModuleService from "../services/ModuleService";
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
            console.log('setTitle!!' + this.state.title)
        }
    }


    render() {
        var t = this.state.title;
        var id = this.state.moduleId;
        return (
            <div>
                <h1>Module: {t}</h1>
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
