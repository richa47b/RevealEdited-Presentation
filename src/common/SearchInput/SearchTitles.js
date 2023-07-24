import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "state-pool";
import { backend_keywords } from "../../store/Constant";
import { Card, CardImg, Col, Row } from "reactstrap";
import { searchFilter } from "./Filter";
import parse from "html-react-parser";
import Reveal from "reveal.js";

const SearchTitles = ({
  setVisible,
  visible,
  setActionState,
  actionstate,
  searchValue,
  setSearchValue,
  resultState,
  setResultState,
  setRestoreIcon
}) => {
  const dropdownRef = useRef(null);
  const [backend_keywordsList] = useGlobalState(backend_keywords);

  const handleRemoveIconsEvent = (evt) => {
    if (evt.detail) {
      setVisible(false);
    }
  };

  window.document.addEventListener(
    "borderToggle",
    handleRemoveIconsEvent,
    false
  );

  const mouseEvent = useCallback(
    (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }

      setVisible(false);
    },
    [setVisible]
  );

  useEffect(() => {
    document.addEventListener("mousedown", mouseEvent, false);
    return () => document.removeEventListener("mousedown", mouseEvent, false);
  }, [mouseEvent]);

  const selectTopic = (item) => {
    Reveal.slide(item);
    setSearchValue(item.Heading);
    setVisible(false);
  };

  const setVisiblilty = (val) => {
    setVisible(false);
  };

  function renderSearchItems() {
    const searchedList = searchFilter(searchValue, backend_keywordsList.state);
    if (searchedList[0].value > 60 && actionstate != "askQuestion") {
      setVisible(false);
      Reveal.slide(searchedList[0].id);
      const element = document.getElementById("speech-bar");
      element.classList.remove("animationSpeechBox");
      setRestoreIcon(true);
      return null;
    }

    return (
      backend_keywordsList.state &&
      searchedList !== null &&
      searchFilter(
        searchValue,
        backend_keywordsList.state.slice(0, 4),
        setVisiblilty
      ).map((x) => (
        <Col sm={3} key={x.id}>
          <Card
            width="250px"
            height="177px"
            className="m-3"
            onClick={() => selectTopic(x.id)}
          >
            <CardImg
              alt="Card image cap"
              src={x.src}
              width="250px"
              height="200px"
            />
          </Card>
        </Col>
      ))
    );
  }
  return (
    <>
      <div
        ref={dropdownRef}
        className={`dropdown ${visible ? "display-none" : "display-none"}`}
      >
        {visible && (
          <ul className="dropdown-content">
            {!backend_keywordsList.state && (
              <li key="zxc" className="dropdown_item">
                no result
              </li>
            )}

            <div
              onClick={() => {
                setResultState("");
                setSearchValue("");
                setActionState("");
                setVisible(!visible);
              }}
              style={{
                borderRadius: "15px"
              }}
            >
              {actionstate == "askQuestion" ? (
                <div className="text-break text-wrap p-2 text-center openai-resultDiv">
                  <span className="p-2 ">{parse(resultState)}</span>
                </div>
              ) : (
                <div>
                  <Row>{renderSearchItems()}</Row>
                  <Row>
                    <Col className="m-2">
                      <Row>
                        <Col>
                          <h6 className="text-muted">Filters</h6>
                        </Col>
                        <Col className="d-flex">
                          <h6 className="text-muted">Slides</h6>
                        </Col>
                        <Col>
                          <h6 className="fst-italic text-muted text-end">
                            Clear All
                          </h6>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};
export default SearchTitles;
