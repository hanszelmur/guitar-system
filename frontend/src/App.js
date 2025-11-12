import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, } from 'react-router-dom';
import Nav from './Nav';
import Login from './pages/Login';
import GuitarView from './pages/GuitarView';
import GuitarUpdate from './pages/GuitarUpdate';
import GuitarAdd from './pages/GuitarAdd';

const NavbarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element = {<NavbarLayout />}>
          <Route path="/guitarview" element={<GuitarView />} />
          <Route path="/guitaradd" element={<GuitarAdd />} />
          <Route path="/updateguitar/:idguitar" element={<GuitarUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
