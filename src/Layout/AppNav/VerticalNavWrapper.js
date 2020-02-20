import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';

import { MainNav,/* ComponentsNav, FormsNav, WidgetsNav, ChartsNav*/ } from './NavItems';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = { activeLinkTo: '/#' };
    }

    componentDidMount() {
        this.setState({
            // activeLinkTo: window.location.hash.replace(/^#/, '')
            activeLinkTo: window.location.hash
        });
    }

    componentWillReceiveProps() {
        this.setState({
            // activeLinkTo: window.location.hash.replace(/^#/, '')
            activeLinkTo: window.location.hash
        });
    }


    render() {  

        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu
                    content={MainNav}
                    // activeLinkFromLocation
                    activeLinkTo={this.state.activeLinkTo}
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />

                {/* <h5 className="app-sidebar__heading">UI Components</h5>
                <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
                <MetisMenu content={WidgetsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Forms</h5>
                <MetisMenu content={FormsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Charts</h5>
                <MetisMenu content={ChartsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);