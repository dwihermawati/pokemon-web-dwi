'use client';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Hero from './home/partials/hero';
import PokemonListSection from './home/partials/pokemonListSection';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return (
    <>
      <Navbar />
      <Hero />
      <PokemonListSection />
      <Footer />
    </>
  );
};

export default Home;
