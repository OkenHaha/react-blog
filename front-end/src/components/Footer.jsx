import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Facebook, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-sky-300 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex justify-center md:justify-start items-center space-x-2">
              <img src={logo} alt="Logo" className="w-20 p-3 rounded-full" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
            Share your story, inspire the world. A platform for bloggers and readers.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#1876f2] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-[#1876f2] dark:text-gray-400" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#0F1419] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600 group-hover:text-[#0F1419]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#0077B5] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#0077B5] dark:text-gray-400" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#E1306C] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <Instagram className="w-5 h-5 text-gray-600 group-hover:text-[#E1306C] dark:text-gray-400" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
          <h3 className="text-lg dark:text-gray-200 font-bold">Links</h3>
          <ul className="space-y-4">
         {['About', 'Home', 'Article'].map((item) => (
          <li key={item}>
          <Link 
            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} 
            className="group dark:hover:text-gray-200 dark:text-gray-400 flex items-center text-gray-600 hover:text-gray-900"
          >
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          {item}
         </Link>
         </li>
         ))}
         </ul>
       </div>


          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Support</h3>
            <ul className="space-y-4">
            {['FAQ', 'Contributors', 'Privacy Policy'].map((item) => (
            <li key={item}>
            <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
           <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
           {item}
           </Link>
           </li>
           ))}
           </ul>
          </div>


          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span>123 Rosario, Argentina</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span><a href="mailto:reactblogswoc@gmail.com" className="hover:underline">reactblogswoc@gmail.com</a></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with Animation */}
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700 dark:border-gray-400"></div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-5">
          <p className="text-center text-gray-900 dark:text-gray-400">
            © Copyright {new Date().getFullYear()}. All Rights Reserved by React-Blog.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
