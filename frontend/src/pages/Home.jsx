import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Speciality from "@/components/Speciality";
import TopDoctors from "@/components/TopDoctors";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <Speciality />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
