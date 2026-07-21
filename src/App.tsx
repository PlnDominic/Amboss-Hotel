import { useState } from 'react';
import type { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Amenities from './pages/Amenities';
import Contact from './pages/Contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (next: Page) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1ece3', color: '#14110f', padding: '20px 20px 0' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', background: '#ffffff', borderRadius: 36, overflow: 'hidden', boxShadow: '0 20px 60px rgba(20,15,10,0.08)' }}>
        <Header page={page} onNavigate={navigate} />

        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'rooms' && <Rooms onNavigate={navigate} />}
        {page === 'amenities' && <Amenities />}
        {page === 'contact' && <Contact />}

        <Footer onNavigate={navigate} />
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
