import HeroBanner from '../components/HeroBanner';
import ExploreOptions from '../components/ExploreOptions';
import PopularTools from '../components/PopularTools';
import ArticlesSection from '../components/ArticlesSection';
import Testimonials from '../components/Testimonials';
import MobileApp from '../components/MobileApp';
import QuickLinks from '../components/QuickLinks';

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ExploreOptions />
      <PopularTools />
      <ArticlesSection />
      <Testimonials />
      <MobileApp />
      <QuickLinks />
    </>
  );
};

export default HomePage;
