import React from 'react'
import { Link , Redirect} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap-tabs';

import {Button} from 'react-bootstrap'

export default
class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="alert alert-info" role="alert">
                    You are signed in as admin. Create a Course by Faculty is not yet supported :)
                </div>
            </div>

        );
    }
}
