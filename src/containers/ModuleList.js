import React from 'react'
import ModuleItem from "../component/ModuleItem";
import ModuleService from "../services/ModuleService";
import { Redirect } from 'react-router-dom'

export default
class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            inputModule: {
                title: ''
            },
            modules: []
        };

        this.moduleService = ModuleService.instance;
        //declare functions of this class
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({courseId: newProps.courseId
        });
        this.findAllModulesForCourse(newProps.courseId)
        this.render()
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    titleChanged(event) {
        this.setState({inputModule:
                {title: event.target.value}
        });
    }

    createModule() {
        this.moduleService
            .createModule(
                this.state.courseId,
                this.state.inputModule)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            });

    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId)
            });
    }

    renderListOfModules() {
        var self = this;
        var i = 1;
        let modules = this.state.modules.map(function (module) {
            return <ModuleItem key={module.id}
                               order={i++}
                               info={module}
                               courseId={self.state.courseId}
                               delete={self.deleteModule}/>
        });
        return modules;
    }

    render() {
        return (
                <div>
                    {this.redirect()}
                    <input className="form-control"
                       value={this.state.inputModule.title}
                       onChange={this.titleChanged}
                       placeholder="Create a module"/>
                    <button className="btn btn-primary btn-block"
                        onClick={this.createModule}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                </div>
        )
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    redirect() {
        if(!this.state.redirect) {
            if(this.state.modules.length > 0) {
                this.setState({redirect: true})
                return <Redirect to={this.redirectLink()}></Redirect>
            }
        }
    }

    redirectLink() {
        console.log(this.state.modules[0])
        return `/course/${this.state.courseId}/module/${this.state.modules[0].id}`
    }

}
