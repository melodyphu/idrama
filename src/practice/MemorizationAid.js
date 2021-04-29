import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import "./practice.css";
import Button from "@material-ui/core/Button";
import ListenIcon from "@material-ui/icons/Hearing";


const MemorizationAid = (props) => {
  const {lines, speakers, selectedSpeaker} = props;
  const {speak} = useSpeechSynthesis();

  const [lineIdx, setLineIdx] = useState(0);

  var commands = [
    {
      command: lines[lineIdx].line,
      callback: () => {
        setLineIdx(lineIdx + 1);
        speak({text: "good job"});
        props.setMessage("good job");
      }
    },
    {
      command: "i drama start",
      callback: () => {
        setLineIdx(0);
        props.setActive(true);
      }
    },
    {
      command: "i drama stop",
      callback: () => {
        setLineIdx(0);
        props.setActive(false);
      }
    },
    {
      command: "i drama pause",
      callback: () => {
        console.log('command');
        props.setActive(false);
      }
    },
    {
      command: "i drama resume",
      callback: () => {
        props.setActive(true);
      }
    },
    {
      command: "i drama line",
      callback: () => {
        let {speaker, line} = lines[lineIdx];
        let newMessage = (speaker === selectedSpeaker) 
          ? "Your current line is: " + line.join(" ")
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
        let {speaker, line} = lines[lineIdx-1];

        let newMessage = (speaker === selectedSpeaker) 
          ? "Your previous line was: " + line.join(" ")
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
        speak({text: "okay"});
        setLineIdx(lineIdx + 1);
      }
    }
  ];

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
    <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ListenIcon />}
        onClick={() => listenContinuously()}
    >
      Start
    </Button>
  );
};

export default MemorizationAid;
