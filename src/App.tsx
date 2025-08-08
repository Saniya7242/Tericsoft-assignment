import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import AddPage from "./pages/Addpage";
import EditPage from "./pages/Editpage";
import LoginPage from "./pages/Loginpage";
import ViewPages from "./pages/Viewpage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/view/:id" element={<ViewPages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;