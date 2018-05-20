import React, {Component} from 'react'
import ModuleItem from "../component/ModuleItem";
import ModuleService from "../services/ModuleService";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleEdit from "./ModuleEdit"

export default
class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.state = {
            courseId: '',
            inputModule: {
                title: ''
            },
            modules:
                [
                //     {title: 'Module 1 - jQuery', id: 123},
                // {title: 'Module 2 - React', id: 234},
                // {title: 'Module 3 - Redux', id: 345},
                // {title: 'Module 4 - Angular', id: 456},
                // {title: 'Module 5 - Node.js', id: 567},
                // {title: 'Module 6 - MongoDB', id: 678}
            ]
        };
        //declare functions of this class
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
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
        console.log('create module');
        this.moduleService
            .createModule(
                this.state.courseId,
                this.state.inputModule)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId);
            });

    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });
    }

    renderListOfModules() {
        var self = this;
        let modules = this.state.modules.map(function (module) {
            return <ModuleItem key={module.id}
                               info={module}
                               delete={self.deleteModule}/>
        });
        return modules;
    }

    render() {
        return (
//            <Router>
                //<div>
                //     {/*<table className="table">*/}
                //         {/*<thead>*/}
                //         {/*<tr>*/}
                //             {/*<th>*/}
                //                 {/*<input className="form-control"*/}
                //                        {/*value={this.state.inputModule.title}*/}
                //                        {/*onChange={this.titleChanged}*/}
                //                        {/*placeholder="Create a module"/>*/}
                //             {/*</th>*/}
                //             {/*<th>*/}
                //                 {/*<button className="btn btn-primary btn-block"*/}
                //                         {/*onClick={this.createModule}>*/}
                //                     {/*<i className="fa fa-plus"></i>*/}
                //                 {/*</button>*/}
                //             {/*</th>*/}
                //         {/*</tr>*/}
                //         {/*</thead>*/}
                //         {/*<tbody>*/}
                //         {/*<ul className="list-group">*/}
                //             {/*{this.renderListOfModules()}*/}
                //         {/*</ul>*/}
                //         {/*</tbody>*/}
                //     {/*</table>*/}
                //
                //     {/*<Route path="/course/:courseId/module/:moduleId"*/}
                //            {/*component= {ModuleEdit}/>*/}
                <div>
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
            // </Router>
        )
    }

    componentWillReceiveProps(newProps){
        this.setState({courseId:
                newProps.courseId
        });
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        console.log(this.state.courseId)
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

}
