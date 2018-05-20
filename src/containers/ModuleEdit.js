import React from 'react';
export default
class ModuleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: ''
        };

        //declare functions
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }


    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }



    //init course and module ID
    componentDidMount() {
        if(!this.isEmpty(this.props)){
            this.setCourseId(this.props.match.params.courseId);
            this.setModuleId(this.props.match.params.moduleId);
        }
    }

    componentWillReceiveProps(newProps) {
        if(!this.isEmpty(newProps)){
            this.setCourseId(newProps.match.params.courseId);
            this.setModuleId(newProps.match.params.moduleId);
        }
    }


    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }


    render() {
        return (
            <div>
                <h1>Module: {this.state.moduleId}</h1>
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
