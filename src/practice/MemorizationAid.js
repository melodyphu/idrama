import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import "./practice.css";
import Button from "@material-ui/core/Button";
import ListenIcon from "@material-ui/icons/Hearing";
import CancelIcon from "@material-ui/icons/Clear";


const MemorizationAid = (props) => {
  const {lines, selectedSpeaker} = props;
  const {speak} = useSpeechSynthesis();

  const [lineIdx, setLineIdx] = useState(0);

  const [listening, setListening] = useState(false);

  const lineMatches = lines.map((entry, index) => {
    return ({
      command: entry.line,
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
      callback: () => {
        if (lineIdx === index && selectedSpeaker === entry.speaker) {
          setLineIdx(lineIdx + 1);
          props.setMessage("good");
        }
      }
    })
  })

  const simpleCommands = [
    {
      command: "i drama line",
      callback: () => {
        let {speaker, line} = lines[lineIdx];
        let newMessage = (speaker === selectedSpeaker) 
          ? line.join(" ")
          : line.join(" ");  

        speak({text: newMessage});
        
        // say the line if it's the user's turn
        if (speaker === selectedSpeaker) {
          props.setMessage(newMessage);
        } else {
          props.setMessage(speaker + ": " + newMessage);
          setLineIdx(lineIdx + 1);
        }
      }
    },
    {
      command: "i drama previous",
      callback: () => {
        if (lineIdx - 1 < 0) {
          speak({text: "There are no previous lines"});
          return;
        }
        let {speaker, line} = lines[lineIdx-1];

        let newMessage = (speaker === selectedSpeaker) 
          ? line.join(" ")
          : line.join(" ");  

        speak({text: newMessage});

        if (speaker === selectedSpeaker) {
          props.setMessage(newMessage);
          setLineIdx(lineIdx - 1);
        } else {
          props.setMessage(speaker + ": " + newMessage);
        }
      }
    },
    {
      command: "i drama skip",
      callback: () => {
        if (lineIdx + 1 >= lines.length) {
          speak({text: "There are no future lines"});
          return;
        }
        speak({text: "skipping to the next line"});
        setLineIdx(lineIdx + 1);
      }
    }
  ];

  const commands = lineMatches.concat(simpleCommands);

  var {
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition({ commands });

  // if speech recognition is not possible!
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div> Your browser does not support speech recognition software!</div>
    );
  }

  // continuous listening
  const listenContinuously = () => {
    console.log("start");
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

    let {line, speaker} = lines[lineIdx];

    if (speaker !== selectedSpeaker) {
      speak({text: line.join(" ")});
      props.setMessage(speaker + ": " + line.join(" "));
      setLineIdx(lineIdx + 1);
    }

  };

  return (
    (!listening) ? (
      <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ListenIcon />}
          onClick={() => {
            setListening(true);
            props.setMessage("listening for speech");
            listenContinuously()
          }}
      >
        Enable
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<CancelIcon />}
        onClick={() => {
          setListening(false);
          SpeechRecognition.abortListening();
          props.setMessage("click enable to start");
        }}
      >
        Disable
      </Button>
    )
  );
};

export default MemorizationAid;
