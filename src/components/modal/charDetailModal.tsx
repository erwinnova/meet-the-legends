import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPlayer from "react-player/lazy";
import "./charModal.css";

import { CharAbilities, Chars } from "../../constant/types/chars";

type Prop = {
    show: boolean;
    handleClose: () => void;
    handleShow: () => void;
    data: Chars | undefined;
};

export default function CharDetailModal({
    show,
    handleClose,
    handleShow,
    data,
}: Prop) {
    const renderAbilities = (param: CharAbilities[]) => {
        if (param.length > 0) {
            return param.map((val, idx) => {
                return (
                    <Col>
                        <img
                            src={val.displayIcon}
                            className="custom-img card-img-top "
                            alt={val.displayName}
                        />
                        <p>Slot: {val.slot}</p>
                        <p>Description: {val.description}</p>
                    </Col>
                );
            });
        } else {
            return null;
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{data?.displayName}</Modal.Title>
                </Modal.Header>
                <Tabs
                    defaultActiveKey="summary"
                    id="uncontrolled-tab-example"
                    className="mb-3 mx-1"
                >
                    <Tab eventKey="summary" title="Summary">
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <img
                                            src={data?.fullPortrait}
                                            className="card-img-top"
                                            alt={data?.displayName}
                                        />
                                    </Col>
                                    <Col>
                                        <p>Role: {data?.role}</p>
                                        <p>About: {data?.description}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                {data && renderAbilities(data?.abilities)}
                            </Row>
                        </Modal.Footer>
                    </Tab>
                    <Tab eventKey="preview" title="Preview">
                        <Modal.Body>
                            <Container>
                                <Row>
                                    {data?.video ? (
                                        <ReactPlayer url={data?.video} />
                                    ) : (
                                        <center>
                                            <span
                                                style={{
                                                    fontStyle: "italic",
                                                    fontSize: "10",
                                                }}
                                            >
                                                no video
                                            </span>
                                        </center>
                                    )}
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Tab>
                </Tabs>
            </Modal>
        </>
    );
}
