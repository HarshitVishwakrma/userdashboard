// src/layouts/MainLayout.jsx
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main >
        <Outlet /> {/* Renders the child components */}
      </main>
    </>
  );
};

export default MainLayout;
