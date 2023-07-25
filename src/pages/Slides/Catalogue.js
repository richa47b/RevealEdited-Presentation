import React, { useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import FocusLock from "react-focus-lock";
import Slide from "../../layouts/Slide";
import Indexbackground from "../../assets/Images/Indexbackground.svg";
import Introduction from "../../assets/Images/Introduction.png";
import IntroDSA from "../../assets/Images/IntroDSA.png";
import Reveal from "reveal.js";

const Catalogue = () => {
  const slideref = useRef();
  const dataArray = [
    {
      id: 2,
      src: Introduction
    },
    {
      id: 11,
      src: IntroDSA
    }
  ];
  return (
    <>
      <Slide backgroundImage={Indexbackground} ref={slideref}>
        <Container
          fluid="sm"
          className="h-100 d-flex justify-content-center pb-5 mb-5 align-items-center position-absolute"
        >
          <FocusLock>
            <Row className="ms-5">
              {dataArray.map((item, index) => (
                <Col
                  sm={6}
                  key={item.id}
                  tabIndex={index + 1}
                  className="pop-up-col p-0"
                  onClick={() => Reveal.slide(item.id)}
                >
                  <img
                    className="rounded"
                    alt=""
                    src={item.src}
                    style={{ width: "80%", height: "auto" }}
                    height="360px"
                  />
                </Col>
              ))}
            </Row>
          </FocusLock>
        </Container>
      </Slide>
    </>
  );
};

export default Catalogue;
