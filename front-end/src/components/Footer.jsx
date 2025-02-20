import React from "react";
import github from "../assets/github.svg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <>
      <footer className="p-8 w-full h-32 bg-gradient-to-r from-white to-white dark:from-[#171d30] dark:to-[#001f3d] text-black dark:text-white bg-emerald-500 shadow-lg shadow-emerald-500/50">
        <div className=" max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
            <div className="mx-auto max-w-sm lg:max-w-none">
              <Link to="/" className="flex items-center space-x-2 group">
                <span>
                  <img src={logo} alt="img" className="w-20 p-3 rounded-full" />
                </span>
              </Link>

              <p className="mt-4 min-w-64 text-center text-gray-500 lg:text-left lg:text-lg dark:text-white dark:hover:text-white/75">
                Share your story, inspire the world. A platform for bloggers and
                readers.
              </p>
            </div>

            <div className="">
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* <!-- Links Section --> */}
    <div>
      <strong className="text-black font-bold text-lg mb-4 block">Links</strong>
      <ul className="space-y-3">
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/"
            aria-label="Go to About Us page"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/"
            aria-label="Go to Home page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/about"
            aria-label="Go to About page"
          >
            About
          </a>
        </li>
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/article-list"
            aria-label="Go to Articles page"
          >
            Articles
          </a>
        </li>
      </ul>
    </div>

    {/* <!-- Additional Links Section --> */}
    <div>
      <strong className="text-black font-bold text-lg mb-4 block">Additional Links</strong>
      <ul className="space-y-3">
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/faq"
            aria-label="Go to FAQ page"
          >
            FAQ's
          </a>
        </li>
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/contributors"
            aria-label="Go to Contributors page"
          >
            Contributors
          </a>
        </li>
        <li>
          <a
            className="text-black hover:text-blue-300 transition duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            href="/PrivacyPolicy"
            aria-label="Go to Privacy Policy page"
          >
            Privacy Policy
          </a>
        </li>
      </ul>
    </div>

    {/* <!-- Contact Section --> */}
    <div>
      <strong className="text-black font-bold text-lg mb-4 block">Contact Us</strong>
      <ul className="space-y-3">
        <li>
          <a
            className="text-black hover:text-amber-400 transition duration-300"
            href="mailto:reactblogswoc@gmail.com"
            aria-label="Send an email to reactblogswoc@gmail.com"
          >
            reactblogswoc@gmail.com
          </a>
        </li>
      </ul>
      <div className="mt-4 flex justify-center space-x-6">
        <a
          className="text-white hover:text-gray-400"
          href="https://github.com/OkenHaha/react-blog"
          rel="noopener noreferrer"
          aria-label="Visit our GitHub repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
 
</div>

</div>
</div>
  <div className="text-center text-black p-2  text-sm w-full bg-blue-200">
    <p>&copy; 2025 Your Company. All Rights Reserved.</p>
  </div>       
      </footer>
    </>
  );
}

export default Footer;
