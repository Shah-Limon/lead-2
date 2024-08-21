import React from "react";
import Banner from "../components/Banner";
import Portfolio from "../components/HomePage/Portfolio";
import Testimonials from "../components/HomePage/Testimonials";
import Pricing from "../components/HomePage/Pricing";
import FeaturesPage from "./FeaturesPage";
import About from "../components/HomePage/About";
import ScrollToTop from "react-scroll-to-top";
import ContactUs from "./ContactUs";


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturesPage></FeaturesPage>
      <Pricing></Pricing> 
      <About></About>
      {/* <Portfolio></Portfolio> */}
      <Testimonials></Testimonials>
      <ContactUs></ContactUs>
      
      <ScrollToTop smooth />
    </div>
  );
};

export default Home;
