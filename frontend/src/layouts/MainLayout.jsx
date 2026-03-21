import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-[1000] shadow-md">
        <AnnouncementBar />
        <Header />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
