import React from 'react'
import { Link , Redirect} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap-tabs';

import {Button} from 'react-bootstrap'

const HW1_URL = "https://webdev-summer1-2018-tamvu.herokuapp.com/"

export default
class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/courses">COURSE MANAGER</a>

                    <div>
                            <button className="btn btn-outline-info">
                                <a href={HW1_URL}>HW1 </a>
                                <i className="fas fa-sign-out-alt"></i>
                            </button>

                        <button className="btn btn-outline-primary">
                            <i className="fas fa-user-edit"></i>
                        </button>


                    </div>
                </nav>
            </div>

        );
    }
}
