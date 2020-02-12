import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container } from 'reactstrap';

import PageTitle from '../../../Layout/PageTitle';
import TablaContainer from '../../TablaOne';

export default class UsuariosDashboard extends Component {

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Commerce Dashboard"
                        subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"
                    />
                    <Fragment>
                        <Container fluid>
                            <TablaContainer />
                        </Container>
                    </Fragment>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
