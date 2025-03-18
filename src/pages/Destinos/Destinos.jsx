"use client";
import React from "react";
import styles from "./Destinos.module.css";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/Searchbar/Searchbar";
//import ImageGallery from "./ImageGallery";
//import Pagination from "./Pagination";
import { Footer } from "../components/Footer/Footer";

function HomePage2() {
  return (
    <main className={styles.homePage}>
      <Navigation />
      <SearchBar />
      
      <Footer />
    </main>
  );
}

export default HomePage2;
