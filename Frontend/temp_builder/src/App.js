import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import TemplateLibrary from "./components/pages/TemplateLibrary";
import Editor from "./components/pages/Editor";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template-library" element={<TemplateLibrary />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
