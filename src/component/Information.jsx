import React, { useEffect, useState } from "react";
import Navbar from "./Component/NavBar";
import { Button, Image } from "antd";
import get_detail_staff from "../api/get_detail_staff";
import { useNavigate } from "react-router-dom";

const Information = () => {

  const navigate= useNavigate()
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const result = await get_detail_staff();
      return setData(result);
    })();
  }, []);
  return (
    <div style={{ width: "100%", display: "flex", height: "100vh" }}>
      <Navbar />
      <div style={{ flex: "1 1 0", padding: 20 }}>
        {data?.login === false ? <div>
            <div>Bạn chưa đăng nhập</div>
            <div>Đăng nhập để tiếp tục</div>
            <Button type={"primary"} onClick={()=> navigate("/")}>Đăng nhập</Button>
        </div> : (
          <>
            <div
              style={{
                width: "100%",
                maxWidth: 600,                
                display: "flex",
                gap: 60,
                margin: 100,
              }}
            >
              <div>
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  {data?.name}
                </div>
                <Image
                  src={"http://localhost:5000/db_face/"+ data?.id+ "_.png"}
                  style={{ width: 200, aspectRatio: 1 / 1 }}
                  alt={""}
                />
              </div>
              <div>
                <div style={{ marginBottom: 12 }}>
                  Họ và tên: {data?.name}
                </div>
                <div style={{ marginBottom: 12 }}>Email: {data?.email}</div>
                <div style={{ marginBottom: 12 }}>SDT: {data?.phone}</div>
                <div style={{ marginBottom: 12 }}>Chức vụ: Nhân viên</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Information;
