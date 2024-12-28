import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { front: "/Images/WatchFaces/face6.png", title: "46mm Silver Aluminum Case" },
  { front: "/Images/WatchFaces/face5.png", title: "46mm Rose Black Aluminum Case" },
  { front: "/Images/WatchFaces/face4.png", title: "46mm Jet Gold Aluminum Case" },
  { front: "/Images/WatchFaces/face3.png", title: "46mm Natural Titanium Case" },
  { front: "/Images/WatchFaces/face2.png", title: "46mm Gold Titanium Case" },
  { front: "/Images/WatchFaces/face1.png", title: "46mm Slate Titanium Case with Black" },
];

const bandImages = [
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

const CaseSelector = () => {
  const [centerFaceImageIndex, setCenterFaceImageIndex] = useState(0);
  const [imageDynamic, setImageDynamic] = useState(0);
  const [isSideView, setIsSideView] = useState(false);
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

    storeCenterFaceImageIndex();
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

    storeCenterFaceImageIndex();
  };

  const storeCenterFaceImageIndex = () => {
    localStorage.setItem(
      "centerFaceImageIndex",
      (centerFaceImageIndex+1)%images.length
    );
  }

  useEffect(() => {
    const val = localStorage.getItem("centerStrapImageIndex");
    setImageDynamic(val);
    console.log(val);
  });

  // Here we are finding which image is in center by checking the image width
  // and current scroll value and dividing both
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const index = Math.round(scrollLeft / totalImageWidth);
        setCenterFaceImageIndex(index);
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
          <div className="absolute z-10">
            <img
              src={bandImages[imageDynamic]?.front}
              alt="watch-strap"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          <div>
            <button
              onClick={scrollLeft}
              className="absolute left-[1rem] top-[10rem] z-30 bg-gray-200 text-gray-500 p-[6px] rounded-full"
            >
              <ChevronLeft height={27} width={27} />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-[1rem] top-[10rem] z-30 bg-gray-200 text-gray-500 p-[6px] rounded-full"
            >
              <ChevronRight height={27} width={27} />
            </button>
          </div>

          <div
            ref={carouselRef}
            className={`absolute z-20 flex ${isSideView ? "overflow-hidden" : "overflow-x-auto"
              } space-x-[-5rem] snap-x snap-mandatory scrollbar-hidden px-[40%]`}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 snap-center ">
                <img
                  src={image.front}
                  alt={`apple-watch-${index}`}
                  width={400}
                  height={400}
                  className="transition-all duration-[1000ms] object-contain"
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
            {images[centerFaceImageIndex]?.title} with{" "}
            {bandImages[imageDynamic]?.title}
          </div>
          <div className="text-sm mt-1">From $429</div>
        </div>
      </div>
    </>
  );
};

export default CaseSelector;
