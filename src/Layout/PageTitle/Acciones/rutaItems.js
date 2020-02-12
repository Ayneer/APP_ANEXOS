import React, {Component, Fragment} from 'react';

import { Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default class RutaItems extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="!#">
                        <FontAwesomeIcon icon={faHome}/></a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/" >Dashboards</Link> 
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Example Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
            </Fragment>
        );
    }
}