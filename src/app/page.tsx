import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Hero from './home/partials/hero';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Footer /> */}
      <div className='h-500 w-full'></div>
    </>
  );
};

export default Home;
