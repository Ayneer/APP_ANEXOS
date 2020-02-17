import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ModalUsuario extends Component {

    render() {

        const {modalEstado, toggle} = this.props;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <span className="d-inline-block mb-2 mr-2">
                        <Modal isOpen={modalEstado} toggle={toggle} className={this.props.className} backdrop="static">
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="link" onClick={toggle}>Cancel</Button>
                                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </span>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

export default ModalUsuario;