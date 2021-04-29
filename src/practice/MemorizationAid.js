import React, { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


const MemorizationAid = (props) => {
  const [message, setMessage] = useState('');

  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    },
    {
      command: 'shut up',
      callback: () => setMessage('I wasn\'t talking.')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!')
    },
  ]

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  // if speech recognition is not possible!
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div> Your browser does not support speech recognition software!</div>;
  }

  // continuous listening
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  };

  return (
    <div>
      <div>
        <span>
          listening:
          {' '}
          {listening ? 'on' : 'off'}
        </span>
        <div>
          <button type="button" onClick={resetTranscript}>Reset</button>
          <button type="button" onClick={listenContinuously}>Listen</button>
          <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
        </div>
      </div>
      <div>
        {message}
      </div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
};

export default MemorizationAid;