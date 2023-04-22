import React from "react";
import Navbar from "../Component/NavBar";
import Chart from "../Component/Chart";

const Home = () => {
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
        <div style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", gap: 50, alignItems: "center"}}>
            <div style={{padding: 20, border: "1px solid #000", textAlign: "center", width: "max-content", height: "max-content"}}>Chấm công</div>

            <div>   
                <Chart />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
