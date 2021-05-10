import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import "./practice.css";
import Button from "@material-ui/core/Button";
import ListenIcon from "@material-ui/icons/Hearing";
import CancelIcon from "@material-ui/icons/Clear";

const MemorizationAid = (props) => {
  // prop variables
  const {script, selectedSpeaker, handRaised, totalLineCount} = props;

  const {speak} = useSpeechSynthesis();

  const [lineIdx, setLineIdx] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);

  // whether or not the browser is listening to someone
  const [listening, setListening] = useState(false);

  // needs confirm
  const [needsConfirm, setNeedsConfirm] = useState(false);

  // voice "commands" aka detecting correctly spoken lines
  const sectionMatches = script.map((sectionEntry, sidx) => {
    let lines = sectionEntry.lines;

    return lines.map((lineEntry, lidx) => {
      return ({
        command: lineEntry.line.join(" "),
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.8,
        callback: () => {
          if (needsConfirm) { return; }
          if (sectionIdx === sidx && lineIdx === lidx) {
            if (lidx + 1 >= lines.length) {
              // move to next section
              props.setLineIdx(0);
              props.setSectionIdx(sectionIdx + 1);

              setLineIdx(0);
              setSectionIdx(sectionIdx + 1);
              
            } else {
              // move to next line of section
              props.setLineIdx(lineIdx + 1);
              setLineIdx(lineIdx + 1);
              
            }

            props.setMessage("good!");
            setTimeout(function(){ props.setMessage("waiting for your next line!"); }, 1000);
          }
        }
      })
    })
  })

  // TODO: add restart section, previous section, and next sections
  // also TODO: filter out the section specific ones if there are no sections given by the use

  const simpleCommands = [
    {
      command: "line", // asking iDrama for the current line
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        let {line} = script[sectionIdx].lines[lineIdx];
        let newMessage = line.join(" ");

        speak({text: newMessage});
        props.setMessage(newMessage);
        setTimeout(function(){ props.setMessage("waiting for the same line!"); }, 3000);
      }
    },
    {
      command: "previous line", // asking iDrama for the previous line, will need to repeat that one
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        if (sectionIdx <= 0 && lineIdx <= 0) {
          speak({text: "There are no previous lines"});
          return;
        }

        let {line} = script[sectionIdx].lines[lineIdx];
        let newMessage = line.join(" ");

        speak({text: newMessage});
        props.setMessage(newMessage);

        // if at the begininning of a section
        if (lineIdx === 0) {
          let newLineIdx = script[sectionIdx].lines.length - 1;
          let newSectionIdx = sectionIdx - 1;

          props.setLineIdx(newLineIdx);
          props.setSectionIdx(newSectionIdx);

          setLineIdx(newLineIdx);
          setSectionIdx(newSectionIdx);
          
        // normal
        } else {
          props.setLineIdx(lineIdx - 1);
          setLineIdx(lineIdx - 1);
        }

        setTimeout(function(){ props.setMessage("Waiting for the previous line"); }, 3000);
      }
    },
    {
      command: "next line", // asking iDrama to move to the next line but with no hint
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        if (sectionIdx >= script.length - 1 && lineIdx >= script[sectionIdx].lines.length - 1) {
          speak({text: "There are no upcoming lines"});
          return;
        }

        speak({text: "Skipping to the next line"});

        // if at the end of the section
        if (lineIdx >= script[sectionIdx].lines.length - 1) {
          props.setLineIdx(0);
          props.setSectionIdx(sectionIdx + 1);
          
          setLineIdx(0);
          setSectionIdx(sectionIdx + 1);

        } else {
          props.setLineIdx(lineIdx + 1);
          setLineIdx(lineIdx + 1);
        }

        props.setMessage("Waiting for the next line!");
      }
    },
    {
      command: "from beginning", // asking iDrama to restart the whole thing, needs confirmation
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        let message = "Are you sure you want to start at the very beginning? Answer with yes or no.";
        speak({text: message});
        props.setMessage(message);
        setNeedsConfirm(true);
      }
    },
    {
      command: "restart section", // asking iDrama to restart the current section
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        let {section, lines} = script[sectionIdx];
        let {line} = lines[0];
        let newMessage = "Restarting " + section + ". Your first word is... " + line[0];

        speak({text: newMessage});
        props.setMessage(newMessage);

        props.setLineIdx(0);
        setLineIdx(0);

        let finalMessage = "Waiting for the first line of " + section;
        setTimeout(function(){ props.setMessage(finalMessage); }, 3000);
      }
    },
    {
      command: "previous section", // asking iDrama to move to the previous section
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        if (sectionIdx <= 0) {
          speak({text: "There are no previous sections"});
          return;
        }

        let {section, lines} = script[sectionIdx - 1];
        let {line} = lines[0];
        let newMessage = "Starting back at " + section + ". Your first word is... " + line[0];

        speak({text: newMessage});
        props.setMessage(newMessage);

        props.setLineIdx(0);
        props.setSectionIdx(sectionIdx - 1);
        setLineIdx(0);
        setSectionIdx(sectionIdx - 1);

        let finalMessage = "Waiting for the first line of " + section;
        setTimeout(function(){ props.setMessage(finalMessage); }, 3000);
      }
    },
    {
      command: "next section", // asking iDrama to move to the next section
      callback: () => {
        if (needsConfirm) { return; }
        if (!handRaised) { return; }

        if (sectionIdx >= script.length - 1) {
          speak({text: "There are no previous sections"});
          return;
        }

        let {section, lines} = script[sectionIdx + 1];
        let {line} = lines[0];
        let newMessage = "Skipping ahead to " + section + ". Your first word is... " + line[0];

        speak({text: newMessage});
        props.setMessage(newMessage);

        props.setLineIdx(0);
        props.setSectionIdx(sectionIdx + 1);
        setLineIdx(0);
        setSectionIdx(sectionIdx + 1);

        let finalMessage = "Waiting for the first line of " + section;
        setTimeout(function(){ props.setMessage(finalMessage); }, 3000);
      }
    },
    {
      command: "yes",
      callback: () => {
        if (!needsConfirm) { return; }
        // if (!handRaised) { return; }

        speak({text: "Okay, starting at the beginning"});
        props.setMessage("Restarting");
        
        props.setLineIdx(0);
        props.setSectionIdx(0);

        setLineIdx(0);
        setSectionIdx(0);
        
        setNeedsConfirm(false);
        setTimeout(function(){ props.setMessage("Waiting for your very first line!"); }, 1000);
      }
    },
    {
      command: "no",
      callback: () => {
        if (!handRaised) { return; }
        if (needsConfirm) {
          speak({text: "okay, we'll continue from here"});
          setNeedsConfirm(false);
          props.setMessage("waiting for your line!");
        }
      }
    }
  ];

  // flatten section match commands first, then concat
  const commands = sectionMatches.flat().concat(simpleCommands);

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
            props.setMessage("waiting for your first line!");
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
          props.setMessage("click enable to start!");
        }}
      >
        Disable
      </Button>
    )
  );
};

export default MemorizationAid;
