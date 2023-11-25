import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {visible && (
        <span onClick={scrollToTop}>
          <TbArrowBigUpLinesFilled
            style={{
              height: "45px",
              verticalAlign: "middle",
              display: "table-cell",
              margin: "auto",
            }}
          />
        </span>
      )}
    </div>
  );
};

export default ScrollToTop;
