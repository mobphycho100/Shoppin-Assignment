import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { front: "/Images/straps/strap1.jpeg", title: "Natural Milanese Loop" },
  { front: "/Images/straps/strap2.jpeg", title: "Natural Link Bracelet" },
  { front: "/Images/straps/strap3.jpeg", title: "Pride Edition Sport Loop" },
  { front: "/Images/straps/strap4.jpeg", title: "Black Unity Sport Loop" },
  { front: "/Images/straps/strap5.jpeg", title: "Denim Sport Band" },
  { front: "/Images/straps/strap6.jpeg", title: "Black Unity Sport Band" },
  { front: "/Images/straps/strap7.jpeg", title: "Pride Edition Braided Solo Loop" },
  { front: "/Images/straps/strap8.jpeg", title: "Black Unity Braided Solo Loop" },
  { front: "/Images/straps/strap9.jpeg", title: "Blue Flame Nike Sport Band" },
];

const carouselImages = [
  { front: "/Images/WatchFaces/face6.png", title: "46mm Silver Aluminum Case" },
  { front: "/Images/WatchFaces/face5.png", title: "46mm Rose Black Aluminum Case" },
  { front: "/Images/WatchFaces/face4.png", title: "46mm Jet Gold Aluminum Case" },
  { front: "/Images/WatchFaces/face3.png", title: "46mm Natural Titanium Case" },
  { front: "/Images/WatchFaces/face2.png", title: "46mm Gold Titanium Case" },
  { front: "/Images/WatchFaces/face1.png", title: "46mm Slate Titanium Case with Black" },
];

const BandSelector = () => {
  const [centerStrapImageIndex, setCenterStapImageIndex] = useState(0);
  const [imageDynamic, setImageDynamic] = useState(0);
  const carouselRef = useRef(null);
  const imageWidth = 400;
  const imageSpacing = -5 * 16;
  const totalImageWidth = imageWidth + imageSpacing;

  // for the handling of right scroll
  const scrollLeft = () => {
    if (carouselRef.current) {
      const newScrollPosition =
        carouselRef.current.scrollLeft - totalImageWidth;
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }

    storeCenterStrapImageIndex();
  };

  // for the handling of left scroll
  const scrollRight = () => {
    if (carouselRef.current) {
      const newScrollPosition =
        carouselRef.current.scrollLeft + totalImageWidth;
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }

    storeCenterStrapImageIndex();
  };

  const storeCenterStrapImageIndex = () => {
    localStorage.setItem(
      "centerStrapImageIndex",
      centerStrapImageIndex+1
    );
  }

  useEffect(() => {
    const val = localStorage.getItem("centerFaceImageIndex");
    setImageDynamic(val);
    console.log(val);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const index = Math.round(scrollLeft / totalImageWidth);
        setCenterStapImageIndex(index);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, [totalImageWidth]);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="absolute z-20">
            <img
              src={carouselImages[imageDynamic]?.front}
              alt="watch-strap"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          <div>
            <button
              onClick={scrollLeft}
              className="absolute left-[1rem] top-[11rem] z-30 bg-gray-200 text-gray-500 p-[6px] rounded-full"
            >
              <ChevronLeft height={27} width={27} />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-[1rem] top-[11rem] z-30 bg-gray-200 text-gray-500 p-[6px] rounded-full"
            >
              <ChevronRight height={27} width={27} />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="absolute z-10 flex
                    space-x-[-5rem] snap-x snap-mandatory scrollbar-hidden overflow-x-auto px-[40%]"
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 snap-center ">
                <img
                  src={image.front}
                  alt={`strap${index}`}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-[28rem]">
          <div className="text-xs text-[#6e6e73] font-semibold">
            APPLE WATCH SERIES 10
          </div>
          <div className="font-semibold text-[#1d1d1f] mt-1">
            {carouselImages[imageDynamic]?.title} with{" "}
            {images[centerStrapImageIndex]?.title}
          </div>
          <div className="text-sm mt-1">From $429</div>
        </div>
      </div>
    </>
  );
};

export default BandSelector;
