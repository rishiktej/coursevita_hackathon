import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Features.css";
import problemImage from "../../images/rightcareer.jpg";
import featureImage1 from "../../images/tech2.jpg";
import featureImage2 from "../../images/tech3.jpg";
import featureImage3 from "../../images/tech4.jpg";
import featureImage4 from "../../images/technology.jpg";
import featureImage5 from "../../images/tech5.jpg";
import featureImage6 from "../../images/tech6.jpg";
import featureImage7 from "../../images/tech7.jpg";
import featureImage8 from "../../images/tech8.avif";

const featuresData = [
  {
    title: "React",
    description:
      "Engage in real-time conversations tailored to your career goals.",
    image: featureImage1,
    route: "/career-coach",
  },
  {
    title: "css",
    description: "Craft standout resumes with guided templates and tips.",
    image: featureImage2,
    route: "/resume-builder",
  },
  {
    title: "Node",
    description: "Prepare for interviews with tailored questions and feedback.",
    image: featureImage3,
    route: "/interview-prep",
  },
  {
    title: "Sql",
    description: "Discover potential career paths based on your skills.",
    image: featureImage4,
    route: "/path-finder",
  },
  {
    title: "DSA",
    description: "Assess and improve your skills with interactive evaluations.",
    image: featureImage5,
    route: "/student-skill-evaluator",
  },
  {
    title: "java",
    description: "Match your profile with job opportunities.",
    image: featureImage6,
    route: "/job-matcher",
  },
  {
    title: "python",
    description: "Learn Quick.",
    image: featureImage7,
    route: "/quick-revision",
  },
  {
    title: "aptitude",
    description: "Land on your dream job.",
    image: featureImage8,
    route: "/find-opportunity",
  },
];

const Features = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".feature-item");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="features-section">
      <div className="dreamroute-features top-0">
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-item">
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <button
                  className="feature-button"
                  onClick={() => navigate(feature.route)}
                >
                  Start Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
