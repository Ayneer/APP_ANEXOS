import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';
import CustomLink from './CustomLink';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav} from './NavItems';

class NavDummy extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menuu</h5>
                <MetisMenu 
                    content={MainNav} 
                    LinkComponent={CustomLink}
                    activeLinkFromLocation 
                    className="vertical-nav-menu" 
                    classNameStateIcon="pe-7s-angle-down"/>
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(NavDummy);