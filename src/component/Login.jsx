import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import login from '../api/login';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from 'antd';

function Login() {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const navigate= useNavigate()

  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput value={email} onChange={(e)=> setEmail(e.target.value)} label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput value={password} onChange={(e)=> setPassword(e.target.value)} label='Password' id='form3' type='password'/>
              </div>

              <MDBBtn onClick={async ()=> {
                const result= await login(email, password)
                if(result?.login=== true) {
                  swal("Thông báo", "Đăng nhập thành công", "success")
                  .then(()=> navigate("/timekeeping", {state: {login: true, email: email, staff: result?.staff}}))
                  .then(()=> Cookies.set("uid", result?.staff?.[0]))
                } 
                else {
                  swal("Thông báo", "Đăng nhập thất bại", "error")
                }
              }} className='mb-4' size='lg'>Đăng nhập</MDBBtn>
              <div>Bạn chưa có tài khoản ?</div>
              <Button type={"primary"} onClick={()=> navigate("/signup")}>Đăng ký</Button>
            </MDBCol>
            

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;