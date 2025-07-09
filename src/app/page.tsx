import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Hero from './home/partials/hero';
import PokemonListSection from './home/partials/pokemonListSection';

const Home = () => {
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
