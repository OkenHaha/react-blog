import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "../assets/blog.png";
import Create from "../assets/write-blog.jpg";
import Read from "../assets/read-blog.jpg";
import mission from "../assets/mission.jpg";
import values from "../assets/values.avif";
import vision from "../assets/vision.avif";
import Contributors from "../pages/Contributors";
import ContributorsLink from "./contributors/ContributorsLink";

function Centre() {
  const navigate = useNavigate();

  return (
    <div
      id="container"
      className="w-full flex flex-col items-center text-3xl dark:bg-gray-900 dark:text-gray-200"
    >
      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-blue-800 dark:text-yellow-400">
            Welcome to{" "}
            <span className="text-yellow-500 dark:text-yellow-300">
              React Blog
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Share your story,{" "}
            <span className="text-green-900 dark:text-green-400 font-semibold">
              inspire the world!
            </span>
            Dive into exciting content and unleash your creativity with us. Join
            the journey of storytelling, innovation, and ideas.
          </p>
          <button 
            onClick={() => navigate('/addarticle')}
            className="px-8 py-3 bg-blue-800 text-white dark:bg-yellow-500 dark:text-gray-900 text-lg rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-yellow-400 transition-colors duration-300"
          >
            Read • Write • Repeat
          </button>
        </div>

        <div className="md:w-1/2 flex mt-16 justify-center">
          <img
            src={Home}
            alt="Blogging Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={550}
          />
        </div>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-800 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Explore & Share
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Your creativity deserves the perfect platform. Let's dive into the
          next steps.
        </p>
      </div>

      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
        <div className="md:w-1/3 flex justify-center mt-10 mb-10 md:mb-0">
          <img
            src={Create}
            alt="Create Blog Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={500}
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-blue-800 dark:text-yellow-400">
            Create Blog
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Start your journey by creating blogs that matter. Share your voice
            with the world, inspire others, and build your personal brand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-blue-800 dark:text-yellow-400">
            Read Blogs
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Dive into a world of creativity and knowledge. Explore blogs from
            diverse topics and find the inspiration you've been searching for.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={Read}
            alt="Read Blog Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={550}
          />
        </div>
      </div>

      <section id="mission-vision-values" className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-yellow-400">
            Our Mission, Vision & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-800 dark:border-gray-700 rounded-lg transform hover:translate-y-[-5px] hover:translate-x-[-5px] transition-transform duration-300 shadow-[0px_0px_10px_2px_rgba(0,112,255,0.5)] hover:shadow-[0px_0px_20px_4px_rgba(0,112,255,0.7)]">
              <img
                src={mission}
                alt="Our Mission"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-yellow-300 mb-2">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-96">
                Our mission is to empower developers by providing high-quality
                content on React and front-end technologies. We foster a
                collaborative community where developers of all experience
                levels share ideas, solve problems, and stay up-to-date with the
                latest trends in the React ecosystem and web development.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-800 dark:border-gray-700 rounded-lg transform hover:translate-y-[-5px] hover:translate-x-[-5px] transition-transform duration-300 shadow-[0px_0px_10px_2px_rgba(0,112,255,0.5)] hover:shadow-[0px_0px_20px_4px_rgba(0,112,255,0.7)]">
              <img
                src={vision}
                alt="Our Vision"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-yellow-300 mb-2">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-96">
                Our vision is to become the leading platform for React
                developers, providing accessible tutorials, in-depth guides, and
                expert insights. We aim to cultivate a community where
                developers of all skill levels innovate, grow, and contribute to
                the advancement of React and modern web development practices.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-800 dark:border-gray-700 rounded-lg transform hover:translate-y-[-5px] hover:translate-x-[-5px] transition-transform duration-300 shadow-[0px_0px_10px_2px_rgba(0,112,255,0.5)] hover:shadow-[0px_0px_20px_4px_rgba(0,112,255,0.7)]">
              <img
                src={values}
                alt="Our Values"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-yellow-300 mb-2">
                Our Values
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-96">
                We value knowledge sharing, continuous learning, and
                community-driven development. Integrity, inclusivity, and
                innovation guide us. We prioritize creating content that is both
                informative and engaging while fostering an open, supportive
                environment where all voices are heard and respected by our
                community.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl font-bold mb-8 text-blue-800 dark:text-yellow-400 
                       bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600 
                       dark:from-yellow-400 dark:to-yellow-300"
            >
              Our Contributors
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Powered by passionate{" "}
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                developers and creators.
              </span>{" "}
              Together, we're building something extraordinary. Join our
              community of{" "}
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                brilliant minds
              </span>{" "}
              who bring this project to life!
            </p>

            <ContributorsLink classes="w-14 h-14" />
          </div>
        </div>
      </section>

      <section id="how-to-get-started" className="relative py-16 overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl font-bold mb-8 text-blue-800 dark:text-yellow-400 
                       bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600 
                       dark:from-yellow-400 dark:to-yellow-300"
            >
              How to Get Started?
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              1.
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                {" "}
                Login
              </span>{" "}
              or{" "}
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                Register
              </span>{" "}
              onto the website. <br />
              <br />
              2. Once logged in, Select the button onto which you are interested
              to.
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                {" "}
                Read or Write.
              </span>{" "}
              <br />
              <br />
              3. Once done with writing{" "}
              <span className="text-blue-800 dark:text-yellow-400 font-semibold">
                click submit.
              </span>{" "}
              Thanks for contributing to our website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Centre;
