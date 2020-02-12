import React, { Component } from 'react';
import {
    NavLink,
    Table,
    CardHeader,
    CardFooter,
    ButtonGroup,
    Popover,
    PopoverBody,
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    Card,
} from 'reactstrap';
import classnames from 'classnames';

import avatar2 from '../../assets/utils/images/avatars/2.jpg';
import bg1 from '../../assets/utils/images/dropdown-header/abstract1.jpg';

class TablaComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popoverOpen1: false,
        }
    }

    render() {
        return (
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">

                        <CardHeader>
                            Active Users
                                    <div className="btn-actions-pane-right">
                                <ButtonGroup size="sm">
                                    <Button caret="true" color="focus"
                                        className={"active"}>Last Week</Button>
                                    <Button caret="true" color="focus">All Month</Button>
                                </ButtonGroup>
                            </div>
                        </CardHeader>

                        <Table responsive hover striped borderless className="align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>Name</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center text-muted">#345</td>

                                    <td>
                                        <div className="widget-content p-0">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left mr-3">
                                                    <div className="widget-content-left">
                                                        <img width={40} className="rounded-circle"
                                                            src={avatar2}
                                                            alt="" />
                                                    </div>
                                                </div>
                                                <div className="widget-content-left flex2">
                                                    <div className="widget-heading">
                                                        John Doe
                                                        </div>
                                                    <div className="widget-subheading opacity-7">
                                                        Web Developer
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        Madrid
                                            </td>

                                    <td className="text-center">
                                        <div className="badge badge-warning">Pending</div>
                                    </td>

                                    <td className="text-center">
                                        <Button size="sm" color="primary" id={'PopoverCustomT-1'}
                                            onClick={this.togglePop1}>
                                            Details
                                                </Button>
                                        <Popover className="popover-custom rm-pointers" placement="auto"
                                            isOpen={this.state.popoverOpen1}
                                            target={'PopoverCustomT-1'} toggle={this.togglePop1}>
                                            <PopoverBody>
                                                <div className="dropdown-menu-header">
                                                    <div className={classnames(
                                                        "dropdown-menu-header-inner bg-focus")}>
                                                        <div className="menu-header-image"
                                                            style={{
                                                                backgroundImage: 'url(' + bg1 + ')'
                                                            }}
                                                        />
                                                        <div className="menu-header-content">
                                                            <h5 className="menu-header-title">Settings</h5>
                                                            <h6 className="menu-header-subtitle">Manage all of your
                                                                    options</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                        </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Chat
                                                                <div
                                                                className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">Recover
                                                                Password</NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-divider" />
                                                    <NavItem className="nav-item-btn text-center">
                                                        <Button size="sm" className="btn-wide btn-shadow"
                                                            color="danger">
                                                            Cancel
                                                            </Button>
                                                    </NavItem>
                                                </Nav>
                                            </PopoverBody>
                                        </Popover>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <CardFooter className="d-block text-center">
                            <Button className="mr-2 btn-icon btn-icon-only" outline color="danger">
                                <i className="pe-7s-trash btn-icon-wrapper"> </i>
                            </Button>
                            <Button className="btn-wide" color="success">
                                Save
                                    </Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default TablaComponent;