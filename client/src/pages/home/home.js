import React from "react";
import Slider from "../../components/slider/slider";
import HomeInfoBox from "./homeInfoBox";
import "./Home.scss";

import { productData } from "../../components/corousel/data";
import CarouselItem from "../../components/corousel/carouselItem";
import ProductCarousel from "../../components/corousel/carousel";
import ProductCategory from "./productCategory";
import FooterLinks from "../../components/footer/FooterLinks";

const Pageheading = ({ heading, btnText }) => {
  return (
    <div>
      <div className="--flex-between ">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </div>
  );
};

const Home = () => {
  const productss = productData.map((item) => {
    return (
      <div key={item.id}>
        <CarouselItem
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
    );
  });

  return (
    <div>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <Pageheading heading={"Latest Products"} btnText={"shop now !!!"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <section className="--bt-grey">
        <div className="container">
          <h3>categories</h3>
          <ProductCategory />
        </div>
      </section>
      <section>
        <div className="container">
          <Pageheading heading={"mobile phones"} btnText={"shop now !!!"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <FooterLinks />
    </div>
  );
};

export default Home;
