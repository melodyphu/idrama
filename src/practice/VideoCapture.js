import React, { useEffect, useRef} from "react";

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

// documentation: https://victordibia.com/handtrack.js/#/
import * as handTrack from 'handtrackjs';

import VIDEO_SPECS from "./../constants/Video";

// for tracking hand for commands + detecting face
const VideoCapture = (props) => {
    const webcamRef = useRef(null);

    useEffect(() => {
        const takeScreenshot = setInterval(() => {
            if (webcamRef.current != null) {
                // take an image
                const imgString = webcamRef.current.getScreenshot({width: VIDEO_SPECS.width, height: VIDEO_SPECS.height});
                
                // convert to HTML image object
                const imageData = new Image(VIDEO_SPECS.width, VIDEO_SPECS.height);
                imageData.src = imgString;

                // detect face and hand raised
                handTrack.load().then(model => {
                    model.detect(imageData).then(predictions => {

                        // bounding boxes are: [x_min, y_min, width, height]
                        var bbs = {face: null, hands: []};
                        var found = {face: false, hand: false};

                        // find face and raised hand
                        for (const detectedObj of predictions) {
                            const {bbox, label, score} = detectedObj;
                            const scoreVal = parseFloat(score);

                            if (label === "face" && scoreVal >= VIDEO_SPECS.face_thresh) {
                                found.face = true;
                                bbs.face = bbox;
                            } else if (label === "open" && scoreVal >= VIDEO_SPECS.hand_thresh) {
                                // check if higher than the face
                                bbs.hands.push(bbox);
                            }
                        }

                        // check if hand is above the face
                        if (found.face && bbs.hands.length > 0) {
                            let y_min_face = bbs.face[1];
                            for (let handBB of bbs.hands) {
                                let y_min_hand = handBB[1];

                                // if the top of the hand is higher than the face
                                if (y_min_hand < y_min_face) {
                                    found.hand = true
                                }
                            }
                        }

                        // update
                        props.handleShowFace(found.face);
                        props.handleRaiseHand(found.hand);
                    });
                });
            }
        }, VIDEO_SPECS.freq * 4000);

        return () => clearInterval(takeScreenshot);

    }, [props]);

    return (
        <div align="center">
            <Webcam 
                mirrored={true}
                width={VIDEO_SPECS.width}
                height={VIDEO_SPECS.height}
                ref={webcamRef}
                screenshotFormat="image/png"
            >
            </Webcam>
        </div>
    );
};

export default VideoCapture;
