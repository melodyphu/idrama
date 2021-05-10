import React, { useEffect, useState, useRef, useCallback} from "react";

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

// documentation: https://victordibia.com/handtrack.js/#/
import * as handTrack from 'handtrackjs';

// for tracking hand for commands + detecting face
function VideoCapture(props) {
    const freq = 1; // seconds

    const webcamRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);

    useEffect(() => {
        const takeScreenshot = setInterval(() => {
            if (webcamRef.current != null) {
                const imageSrc = webcamRef.current.getScreenshot();
                setScreenshot(imageSrc);
                console.log("success");
            }
        }, freq * 4000);
        return () => clearInterval(takeScreenshot);
    }, []);

    return (
        <div>
            <Webcam 
              mirrored={true}
              height={420}
              width={720}
              ref={webcamRef}
              screenshotFormat="image/png"
            />
            {/* <img src={screenshot}/> */}
        </div>
    );
};

export default VideoCapture;
