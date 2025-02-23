import { useState, useEffect } from "react";
import { Heart, Users, Sparkles, BookOpen, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import TidioChat from "../components/Tidio";


const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: "Active Writers", value: "2,000+" },
    { label: "Articles Published", value: "10,000+" },
    { label: "Monthly Readers", value: "150,000+" },
    { label: "Countries Reached", value: "120+" },
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passionate Community",
      description:
        "Join a vibrant community of writers and readers who share your love for storytelling.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Diverse Perspectives",
      description:
        "Experience stories and insights from writers across different cultures and backgrounds.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Creative Freedom",
      description:
        "Express yourself freely with our powerful and intuitive writing tools.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Exchange",
      description:
        "Learn and grow through shared experiences and collaborative learning.",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "To create a global platform where every voice matters and every story finds its audience. We're dedicated to fostering a community where creativity thrives and writers can grow.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become the world's most inclusive and innovative platform for digital storytelling, where technology meets creativity to empower writers of all backgrounds.",
    },
    values: {
      title: "Our Values",
      content:
        "We believe in authenticity, diversity, creativity, and the power of community. These principles guide everything we do, from feature development to community management.",
    },
  };

  return (
    <>
    <TidioChat/>
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,black,transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering voices, connecting minds, and inspiring creativity
              through the art of storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="md:flex items-center gap-12">
          {/* Left Side */}
          <div
            className={`md:w-1/2 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3 scale-105 opacity-10 animate-pulse"></div>
              <img
                src={
                  "https://static-blog.siteground.com/wp-content/uploads/sites/4/2022/02/what-is-a-blog-1200x600-1.jpeg"
                }
                alt="About Us Illustration"
                className="relative rounded-2xl shadow-2xl transform transition duration-500 hover:scale-[1.02]"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full opacity-20 animate-blob"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-600 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`md:w-1/2 mt-12 md:mt-0 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {tabContent[activeTab].title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {tabContent[activeTab].content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
 
            <div
            key={feature.title}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } group`}
            style={{ transitionDelay: `${800 + index * 50}ms`}}
          >
            {/* Shadow pulse animation */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-pulse pointer-events-none"></div>
           
              <div className="relative w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg group">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 transform translate-y-1 group-hover:translate-y-0 bg-black bg-opacity-10 rounded-lg transition-transform duration-300"></span>
                <span className="relative z-10">{feature.icon}</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div
          className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of writers and readers today.
          </p>
          <Link to="/#how-to-get-started">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-blue-50 transition-colors duration-300">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
