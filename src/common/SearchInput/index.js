import React, { useState, useRef } from "react";
import { emitCustomEvent } from "react-custom-events";

import Speech from "./Speech";
import { post } from "../../services/httpService.js";
import SearchTitles from "./SearchTitles";

const SearchInput = () => {
  const [resultState, setResultState] = useState("");
  const [actionstate, setActionState] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [restoreIcon, setRestoreIcon] = useState(true);

  const speechBarInputRef = useRef();

  const setsearchAndVisibleValue = (e) => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const getTextFrominterimTranscript = (transcript) => {
    setTimeout(() => {
      setSearchValue(transcript);
      const e = { target: {} };
      e.target.value = transcript;
    }, 0);
  };

  const getTextFromSpeech = (text) => {
    if (text === "") return;
    let jsonForNLU = {
      sender: "kp",
      message: text
    };
    let result = classifyIntentWithNLU(jsonForNLU);
    result.then((response) => processNLUOutput(response, text));
  };

  const processNLUOutput = (result, text) => {
    result = result.data[0].text;
    let extractedEntity = result.split(":")[1];

    let action = result.split(":")[0];
    let Question = { que: text };
    let speechValue = "";
    setActionState("");
    if (action == "askQuestion") {
      setActionState("askQuestion");
      //
      const resultsFromGPT = post(
        "http://127.0.0.1:8000/submit_form",
        Question
      );
      resultsFromGPT.then((response) => {
        speechValue = response.data.answer;

        setResultState(speechValue);

        setSearchValue(text);
      });
      return;
    }

    if (action == "slide") {
      setActionState("slide");
      setResultState(speechValue);
      //
      setTimeout(() => {
        setSearchValue(extractedEntity);

        const e = { target: {} };

        e.target.value = extractedEntity;

        setsearchAndVisibleValue(e);
      }, 0);
      return;
    }
    if (action == "previousSlide") {
      emitCustomEvent("navigation-event", "left");
      return;
    }
    if (action == "nextSlide") {
      emitCustomEvent("navigation-event", "right");
      return;
    }
  };

  const classifyIntentWithNLU = async (sentence) => {
    const results = await post(
      "https://obsidian-rasa-nlu.47billion.com/webhooks/rest/webhook",
      sentence
    );
    return results;
  };

  return (
    <div className="d-flex" tabIndex={-1}>
      <Speech
        setActionState={setActionState}
        actionstate={actionstate}
        onSpeechRecieved={getTextFromSpeech}
        getTextFrominterimTranscript={getTextFrominterimTranscript}
        searchValue={searchValue}
        setsearchAndVisibleValue={setsearchAndVisibleValue}
        setSearchValue={setSearchValue}
        speechBarInputRef={speechBarInputRef}
        setVisible={setVisible}
        restoreIcon={restoreIcon}
        setRestoreIcon={setRestoreIcon}
      />
      <SearchTitles
        setVisible={setVisible}
        visible={visible}
        setActionState={setActionState}
        actionstate={actionstate}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        resultState={resultState}
        setResultState={setResultState}
        restoreIcon={restoreIcon}
        setRestoreIcon={setRestoreIcon}
      />
    </div>
  );
};

export default SearchInput;
