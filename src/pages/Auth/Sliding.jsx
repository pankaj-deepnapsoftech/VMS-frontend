import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Risk Operations Centre",
    subtitle:
      "Risk Operations Centre: Aggregation, integrated & Orchestrated risk management across all domains, providing a cohesive strategy to navigate this uncertainty. Know More >",
    cta: "Start Using for Free",
  },
  {
    title: "Threat & Vulnerability Management (TVM)",
    subtitle:
      "Threat & Vulnerability Management (TVM): Discover, assess, prioritize, and patch critical vulnerabilities and reduce cybersecurity risk in real time across your global hybrid Cloud, IT, OT, and IoT landscape — all from a single platform. Know More >",
    cta: "Start Using for Free",
  },
  {
    title: "Attack Surface Management",
    subtitle: 
      "Attack Surface Management: Enhance & mature your organization's security posture by discovering and protecting the Attack Surface of your organization by leveraging open-source intelligence and our proprietary algorithms. Know More >",
    cta: "Start Using for Free",
  },
  {
    title: "Risk & Compliance",
    subtitle:
      "Risk & Compliance: Surface and manage more risk: Gain a comprehensive understanding of risks across all areas of your business. Know More >",
    cta: "Start Using for Free",
  },
];                                                                              

const SlidingComponent = () => {
  return (
    <div className="h-[800px] bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center bg-background text-white">
      <Swiper
        direction="horizontal"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            const num = (index + 1).toString().padStart(2, "0");
            return `<span class="${className} text-white text-sm font-mono mx-1">${num}</span>`;
          },
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col lg:flex-row h-full w-full px-6 lg:px-12 py-20 items-center justify-between gap-10">
              <div className="flex-1 max-w-xl">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-gray-300 mb-8 text-lg">{slide.subtitle}</p>
                <button className="bg-[#313233] text-gray-400 px-6 py-3  rounded-md shadow-lg hover:bg-[#2d2f30] transition">
                  {slide.cta}
                </button>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <img
                  src="/sliding.png"
                  alt={`Slide ${i + 1}`}
                  className="w-[600px] h-[700px] object-contain rounded-xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlidingComponent;
