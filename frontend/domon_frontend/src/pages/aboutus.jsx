import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cyber_image1 from '../assets/images/aboutusImages/image1.webp'
import domain_extension from '../assets/images/aboutusImages/domain_extension.jpg'
import http_image from '../assets/images/aboutusImages/http_image.jpeg'

const AboutUs = () => {
  const [userCount, setUserCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const targetUsers = 500;
  const targetDomains = 1500;

  // Dynamic Counter Effect
  useEffect(() => {
    const userInterval = setInterval(() => {
      setUserCount((prev) => (prev < targetUsers ? prev + 5 : targetUsers));
    }, 30);
    const domainInterval = setInterval(() => {
      setDomainCount((prev) => (prev < targetDomains ? prev + 10 : targetDomains));
    }, 20);

    return () => {
      clearInterval(userInterval);
      clearInterval(domainInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-blue-600 py-20 text-center">
        <h1 className="text-5xl font-bold">Why Domain Monitoring Matters</h1>
        <p className="text-lg mt-4 max-w-3xl mx-auto">
          Secure your brand, prevent impersonation, and stay ahead of cyber threats with 24/7 domain monitoring.
        </p>
      </div>

      {/* Cybersecurity Image Carousel */}
      <div className="max-w-5xl mx-auto mt-8 shadow-lg">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          className="rounded-lg overflow-hidden"
        >
          <div>
            <img src={cyber_image1} alt="Cybersecurity Protection"  className="h-[600px] w-[80px]"/>
            <p className="legend">Cybersecurity Protection</p>
          </div>
          <div>
            <img src={domain_extension} alt="Threat Detection" />
            <p className="legend">Threat Detection</p>
          </div>
          <div>
            <img src={http_image} alt="Domain Security Monitoring" />
            <p className="legend">Domain Security Monitoring</p>
          </div>
        </Carousel>
      </div>

      {/* Statistics Section with Dynamic Counter */}
      <div className="flex justify-center items-center py-16">
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">{userCount}+</h2>
          <p className="text-lg">Users Monitoring Domains</p>
        </motion.div>
        <motion.div
          className="bg-gray-800 p-8 mx-6 rounded-lg shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">{domainCount}+</h2>
          <p className="text-lg">Domains Being Monitored</p>
        </motion.div>
      </div>

      {/* About Us Section */}
      <div className="py-16 px-8 max-w-6xl mx-auto text-lg">
        <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
        <p className="leading-7">
          We specialize in advanced domain monitoring and cybersecurity solutions, ensuring that brands and businesses remain protected
          from unauthorized use, impersonation, and domain hijacking. With an ever-growing threat landscape, our platform helps businesses
          stay proactive against cyber threats.
        </p>

        <h3 className="text-3xl font-semibold mt-8">Why is Domain Monitoring Important?</h3>
        <ul className="list-disc mt-4 pl-8">
          <li>⚡ Detects unauthorized use of your domain name.</li>
          <li>🔍 Prevents phishing attacks and brand impersonation.</li>
          <li>📢 Sends instant alerts for domain expiration threats.</li>
          <li>📊 Tracks new registrations resembling your brand.</li>
          <li>🔒 Protects your business reputation and customer trust.</li>
        </ul>

        <h3 className="text-3xl font-semibold mt-8">Our Key Features</h3>
        <ul className="list-disc mt-4 pl-8">
          <li>✅ Real-time domain threat monitoring</li>
          <li>✅ Automated phishing detection</li>
          <li>✅ 24/7 security alerts & reporting</li>
          <li>✅ AI-powered domain analytics</li>
          <li>✅ Dedicated cybersecurity support</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800">
        <p className="text-gray-400">© 2025 Domon Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
