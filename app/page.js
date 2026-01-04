'use client'
import { Suspense } from 'react'
import Layout from "../components/layout/Layout";
import BrowseByMode from "../components/sections/BrowseByMode";
import CarBannerV1 from "../components/sections/CarBannerV1";
import CarBlogV1 from "../components/sections/CarBlogV1";
import CarListV2 from "../components/sections/CarListV2";
import CounterCar from "../components/sections/CounterCar";
import IconBox from "../components/sections/IconBox";
import Logo from "../components/sections/Logo";
import Slide from "../components/sections/Slide";
import SlideSearchCar from "../components/sections/SlideSearchCar";
import TabCarService from "../components/sections/TabCarService";
import TestimonialCar from "../components/sections/TestimonialCar";
import ModalBookingSuccess from "../components/elements/ModalBookingSuccess";

export default function Home() {
  return (
    <Layout headerStyle={3} footerStyle={1}>
      {/* Booking Success Popup */}
      <Suspense fallback={null}>
        <ModalBookingSuccess />
      </Suspense>
      
      {/* Hero & Search Sections */}
      <Slide />
      <SlideSearchCar />

      {/* Main Features & Services */}
      <IconBox />
      <TabCarService />

      {/* Browse Cars & Brands */}
      <BrowseByMode />
      <Logo />

      {/* Car Listings & Counters */}
      {/* <CarListV2 />
      <CounterCar /> */}

      {/* Testimonials & Promotional Banner */}
      <TestimonialCar />
      {/* <CarBannerV1 /> */}

      {/* Blog & Updates */}
      {/* <CarBlogV1 /> */}
    </Layout>
  );
}