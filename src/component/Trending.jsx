import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Trending = ({ trendBlogs }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navContainer: "#navhere",
    responsive: {
      0: {
        items: 1,
      },
    },
  };
  return (
    <>
      <div>
        <div className="blog-heading text-start py-2 mb-4">Trending</div>
      </div>
      <div className="trend">
        <OwlCarousel {...options} className="owl-theme trend ">
          {trendBlogs.map((item, index) => (
            <div className="item px-2 " key={index}>
              <Link to={`/detail/${item.id}`}>
                <div className="trending-img-position">
                  <div className="trending-img-size">
                    <img
                      src={item.imgUrl}
                      className="trending-img-relative"
                      alt={item.title}
                    />
                  </div>
                  <div className="trending-img-absolute"></div>
                  <div className="trending-img-absolute-1 text-center">
                    <span className="text-white">{item.title}</span>
                    <div className="trending-meta-info">
                      {item.author} - {moment().format("dddd")}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </OwlCarousel>
      </div>
      <div id="navhere" className="d-flex justify-content-center"></div>
    </>
  );
};

export default Trending;
