import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AddPage from './pages/Addpage';
import EditPage from './pages/Editpage'; 
import LoginPage from './pages/Loginpage';
import ViewPages from './pages/Viewpage'; 
function App() {
  return (
    <Router>
      <div>

        <nav>
          <Link to="/Home">Home</Link>
          <Link to="/Add">Add</Link>
          <Link to="/Edit">Edit</Link>
          <Link to="/login">Login</Link>
          <Link to="/view">View</Link>
        </nav>

       
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/view" element={<ViewPages />} />
        </Routes>

        
      </div>
    </Router>
  );
}

export default App;
