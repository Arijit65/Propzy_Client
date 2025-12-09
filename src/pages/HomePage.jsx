import HeroBanner from '../components/HeroBanner';
import ExploreOptions from '../components/ExploreOptions';
import PopularTools from '../components/PopularTools';
import ArticlesSection from '../components/ArticlesSection';
import Testimonials from '../components/Testimonials';
import EnquiryForm from '../components/EnquiryForm';
import MobileApp from '../components/MobileApp';
import QuickLinks from '../components/QuickLinks';
import HeroSection from '../components/HeroSection';
import MainFooter from '../components/MainFooter';
import FeaturedProperty from '../components/property-listings/FeaturedProperty';
import InvestmentProperty from '../components/property-listings/InvestmentProperty';
import TopHighlightedProjects from '../components/property-listings/TopHighlightedProjects';
import RecentlyAddedproperty from '../components/property-listings/RecentlyAddedproperty';

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      {/* <HeroBanner /> */}
      <FeaturedProperty/>
        <RecentlyAddedproperty/>
      
      <TopHighlightedProjects/>
      <InvestmentProperty/>
    
      {/* <ExploreOptions /> */}
      <PopularTools />
      <ArticlesSection />
      {/* <Testimonials /> */}
      <EnquiryForm />
      {/* <MobileApp /> */}
      <QuickLinks />
      <MainFooter/>
    </>
  );
};

export default HomePage;
