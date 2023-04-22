import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Navbar from "../Component/NavBar";
import get_list_staff from "../../api/get_list_staff";

const columns = [
  { field: "id", headerName: "Mã nhân viên", width: 150 },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 110,
  },
  {
    field: "position",
    headerName: "Chức vụ",
    width: 160,
    renderCell: (params)=> {
      return <>Nhân viên</>
    }
  },
];
const Staff = () => {
  const [data, setData]= useState([])
  useEffect(()=>{ 
    (async ()=>{
      const result=await get_list_staff()
      return setData(result)
    })()
  }, [])

  return (
    <div style={{ width: "100%", display: "flex", height: "100vh" }}>
      <Navbar />
      <div
        style={{
          flex: "1 1 0",
          gap: 50,
          display: "flex",
          flexDirection: "row",
          padding: 20,
          margin: 100,
        }}
      >
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default Staff;
