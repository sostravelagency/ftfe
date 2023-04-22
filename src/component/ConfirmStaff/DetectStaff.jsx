import React, { useState } from "react";
import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import html2canvas from "html2canvas";

const width = 500;
const height = 500;

const WebcamDemo2 = () => {
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
  
    const context = canvas.getContext('2d');
  
    // Calculate the position of the face in the canvas
    const { xCenter, yCenter, width: faceWidth, height: faceHeight } = boundingBox[0];
    const facePositionX = Math.floor(xCenter * canvas.width);
    const facePositionY = Math.floor(yCenter * canvas.height);
  
    // Get the image data of the face
    const imageData = context.getImageData(Math.floor(facePositionX), Math.floor(facePositionY), Math.floor(faceWidth * canvas.width), Math.floor(faceHeight * canvas.height));
  
    // Create a new canvas and draw the face on it
    const newCanvas = document.createElement('canvas');
    newCanvas.width = Math.floor(faceWidth * canvas.width);
    newCanvas.height = Math.floor(faceHeight * canvas.height);
    newCanvas.getContext('2d').putImageData(imageData, 0, 0);
  
    // Convert the canvas to a data URL
    const dataURL = newCanvas.toDataURL('image/jpeg');
  
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
          <br />
                <Button color={"primary"} variant={"contained"} onClick={()=> {
                    swal("Thông báo", "Bạn đã chắc xác nhận đây là khuôn mặt của bạn, Đây là khuôn mặt chúng tôi sẽ chấm công cho bạn mỗi khi bạn đi làm", {buttons: {
                        ok: "Xác nhận",
                        cancel: "Hủy"
                    }})
                    .then(async value=> {
                        if(value=== "ok") {
                            const data = new FormData();
                            data.append('file', image);
                            data.append("name", location.state?.uid)
                            fetch(`${API_URL}/staff/confirm-user`, {
                                method: 'POST',
                                body: data
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(data?.confirm=== true) {
                                    swal("Thông báo", "Bạn đã xác thực thành công, Bạn sẽ được điều hướng đến trang đăng nhập", "success")
                                    .then(()=> navigate("/login", {replace: true}))
                                }
                            })
                            .catch(error => console.error(error));
                        }
                        else {
                            return null
                        }
                    })
                }}>Xác nhận</Button>
        </div>
      )}
    </div>
  );
};

export default WebcamDemo2;
