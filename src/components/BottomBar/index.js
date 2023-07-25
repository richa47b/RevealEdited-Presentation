import React from "react";
import { Row, Col } from "reactstrap";
import OffCanvasMenu from "../OffcanvasMenu";
import ToolBar from "../Toolbar";
import SearchInput from "../../common/SearchInput";
const BottomBar = ({ skipToFunction }) => {
  return (
    <Row className="bottomNavDiv">
      <Col>
        <OffCanvasMenu skipToFunction={skipToFunction} />
      </Col>
      <Col>
        <ToolBar />
      </Col>
      <Col>
        <SearchInput />
      </Col>
    </Row>
  );
};

export default BottomBar;
