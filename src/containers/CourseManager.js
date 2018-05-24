import React from 'react';
import CourseEditor from "./CourseEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseList from "./CourseList";

export default
class CourseManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userId: ''}
    }

    componentWillMount(newProps) {
        this.setState({userId: newProps.uid})
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="container-fluid">

                        <Route path="/courses"
                               component={CourseList}>
                        </Route>

                        <Route path="/course/:id"
                               component={CourseEditor}>
                        </Route>

                    </div>
                </div>

            </Router>
        )
    }
}