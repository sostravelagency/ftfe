import React, { useState, useRef } from 'react'
import Webcam from "react-webcam";
// import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { v4 } from 'uuid';
import { API_URL } from '../config';
import { Button, CircularProgress } from '@mui/material';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TimeKeeping = () => {
  return (
    <div>
      <CameraCapture />
    </div>
  )
}

const CameraCapture = () => {
    const [loading, setLoading]= useState(false)
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const location= useLocation()
    const navigate= useNavigate()
    const capture = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      await uploadImage(imageSrc);
    };
  
    const uploadImage = async (base64EncodedImage) => {
        const data= new FormData()
        data.append("file", base64EncodedImage)
        data.append("name", v4())
        setLoading(()=> true)
        const res= await fetch(`${API_URL}/api/timekeeping`, {
          method: 'POST',
          body: data
      })
      setLoading(()=> false)
      const result= await res.json()
      if(result?.result=== "no identity") {
        return swal("Thông báo", "Chấm công thất bại, không nhận ra được khuôn mặt của bạn trong hệ thống", "error")
      }
      if(result?.result=== "fake face") {
        return swal("Thông báo", "Chấm công thất bại, không nhận diện được khuôn mặt của bạn", "error")

      }
      if(result?.result=== "fake face") {
        return swal("Thông báo", "Chấm công thất bại, không phát hiện được khuôn mặt nào", "error")
      }
      // if(result?.result?.replace("_", "")!= location.state?.staff?.[0]) {
      //   return swal("Thông báo", "Chấm công thất bại, đây không phải là gương mặt của bạn", "error")
      // }
      if(result?.result?.includes("_")) {
        Cookies.set("uid", result?.replace("_"))
        return swal("Thông báo", "Chấm công thành công", "success").then(()=> navigate("/", {replace: true}))

      }
      
    };
  
    return (
      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: 700}}>
          <div style={{textAlign: "center", fontSize: 24, margin: "12px 0"}}>Bảng chấm công</div>
          <Webcam audio={false} ref={webcamRef} />
          <br />
          {
            loading=== true && <>
            <Button style={{height: 50, display: "flex", justifyContent: "center", alignItems: 'center', gap: 10}} variant={"contained"}><CircularProgress style={{color: "#fff"}} />Đang nhận diện khuôn mặt của bạn</Button>
            </>
          }
          {
            loading=== false && 
            <Button style={{height: 50}} onClick={capture} variant={"contained"}>Chấm công</Button>
          }
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button onClick={capture} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", marginTop: "-4rem", position: "relative", zIndex: 999 }}>
            <FaCamera size={32} />
          </button>
        </div>
        {/* {image && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <img src={image} alt="Captured Image" style={{ maxWidth: "100%" }} />
          </div>
        )} */}
      </div>
    );
  };
  

export default TimeKeeping