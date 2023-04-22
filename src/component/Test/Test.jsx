import React, { useState } from "react";
import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import html2canvas from "html2canvas";

const width = 500;
const height = 500;

const WebcamDemo = () => {
  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  const [capturedImage, setCapturedImage] = useState("");

  const handleCapture = async () => {
    const canvas = await html2canvas(webcamRef.current.video, {
      useCORS: true,
      logging: false,
      allowTaint: true,
      width: webcamRef.current.video.videoWidth,
      height: webcamRef.current.video.videoHeight,
    });

    const context = canvas.getContext("2d");

    // Calculate the position of the face in the canvas
    const { x, y, width: faceWidth, height: faceHeight } = boundingBox[0];
    const facePositionX = x * canvas.width;
    const facePositionY = y * canvas.height;

    // Get the image data of the face
    const imageData = context.getImageData(
      facePositionX,
      facePositionY,
      faceWidth * canvas.width,
      faceHeight * canvas.height
    );

    // Create a new canvas and draw the face on it
    const newCanvas = document.createElement("canvas");
    newCanvas.width = faceWidth * canvas.width;
    newCanvas.height = faceHeight * canvas.height;
    newCanvas.getContext("2d").putImageData(imageData, 0, 0);

    // Convert the canvas to a data URL
    const dataURL = newCanvas.toDataURL("image/jpeg", 1.0);
    setCapturedImage(dataURL);
  };

  return (
    <div>
      <div style={{ width, height, position: "relative" }}>
        {boundingBox.map((box, index) => (
          <div
            key={index + 1}
            style={{
              border: "4px solid red",
              position: "absolute",
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: ` ${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))}
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
            height,
            width,
            position: "absolute",
          }}
        />
      </div>
      <button onClick={handleCapture}>Capture Image</button>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamDemo;
