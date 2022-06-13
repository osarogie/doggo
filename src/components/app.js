import React from "react";
import "../stylesheets/app.css";
import { Route, Routes } from "react-router";
import Search from "../routes/search";
import { Link } from "react-router-dom";
import { Row } from "antd";

function App() {
  return (
    <div className="app">
      <Row>
        <h1>Doggo Search</h1>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <Link to="/">Search</Link>
        </div>
      </Row>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
