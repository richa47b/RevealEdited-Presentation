import React, { useEffect, useRef, useState } from "react";
import { emitCustomEvent } from "react-custom-events";
import { useCustomEventListener } from "react-custom-events";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const Speech = ({
  onSpeechRecieved,
  getTextFrominterimTranscript,
  setVisible,
  setSearchValue,
  speechBarInputRef,
  setsearchAndVisibleValue,
  searchValue,
  setActionState,
  actionstate,
  restoreIcon,
  setRestoreIcon
}) => {
  useCustomEventListener("speechRecognition-event", (data) => {
    if (data === "start") {
      HandleSpeech();
      emitCustomEvent("notification-event", "LISTENING");
    }
    // if (data === "stop")
    if (data === "stop") {
      SpeechRecognition.stopListening();
      //  emitCustomEvent('notification-event', 'SLIDE')
    }
  });
  useCustomEventListener("search-event", (data) => {
    if (data == "search") {
      // setShowImage(false)
      setRestoreIcon(false);
      setVisible(true);
      speechBarInputRef.current.classList.add("animationSpeechBox");
      speechBarInputRef.current.focus();
      setSearchValue("");
    }
  });
  const [showImage, setShowImage] = useState(true);
  const spokenLength = useRef(0);
  const previousSentence = useRef("");
  const iconRef = useRef();
  const {
    listening,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    listening || actionstate == "askQuestion"
      ? speechBarInputRef.current.classList.add("animationSpeechBox")
      : speechBarInputRef.current.classList.remove("animationSpeechBox");
    if (actionstate == "askQuestion") setVisible(true);
    else setVisible(false);
  }, [listening, actionstate, setVisible, speechBarInputRef]);

  useEffect(() => {
    setShowImage(restoreIcon);
  }, [restoreIcon]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const processTranscript = (sentence) => {
    let currentSentence = sentence.substring(spokenLength.current);
    if (previousSentence.current === currentSentence) return;
    previousSentence.current = currentSentence;
    if (currentSentence === "") return;
    SpeechRecognition.stopListening();
    emitCustomEvent("notification-event", "SLIDE");
    onSpeechRecieved(currentSentence);
  };

  if (finalTranscript !== "") processTranscript(finalTranscript);
  if (interimTranscript !== "") getTextFrominterimTranscript(interimTranscript);

  const HandleSpeech = () => {
    emitCustomEvent("notification-event", "LISTENING");
    if (listening) return;
    console.log("Inside Handle SPeech");
    onSpeechRecieved("");
    console.log("start listening");
    SpeechRecognition.startListening();
    setActionState("");
  };

  return (
    <div
      className="hoverable-speech"
      tabIndex={-1}
      id="speech"
      onClick={() => {
        emitCustomEvent("machineEvent", "DETECTSEARCH");
      }}
    >
      <div className="position-absolute hidden-speech" tabIndex={-1}>
        {listening == true ? (
          <div id="circleAnimation">
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
          </div>
        ) : null}

        <div className="speech-box " tabIndex={-1}>
          <div className="speech-container  position-fixed " tabIndex={-1}>
            <span className="speech-icon" tabIndex={-1}>
              {showImage ? (
                <img
                  className="mic-icon"
                  tabIndex={-1}
                  onClick={() => {
                    setSearchValue("");
                    // HandleSpeech()
                    emitCustomEvent("speechRecognition-event", "start");
                  }}
                  alt=""
                  src="/app/MicIcon.svg"
                ></img>
              ) : (
                <img
                  ref={iconRef}
                  className="mic-icon"
                  tabIndex={-1}
                  onClick={() => {
                    setSearchValue("");
                    emitCustomEvent("speechRecognition-event", "start");
                  }}
                  alt=""
                  src="/app/SearchIcon.svg"
                ></img>
              )}
            </span>

            <input
              tabIndex={-1}
              id="speech-bar"
              type="search"
              placeholder="Search..."
              value={searchValue}
              onChange={setsearchAndVisibleValue}
              onClick={() => {
                setSearchValue("");
              }}
              ref={speechBarInputRef}
              onFocus={() => {
                setVisible(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speech;
