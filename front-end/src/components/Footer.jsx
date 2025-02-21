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
            
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Home', 'Article'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="group dark:hover:text-gray-200 dark:text-gray-400 flex items-center text-gray-600 hover:text-gray-900">
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
              {['FAQ', 'Contributor', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
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

        
      </div>
    </footer>
  );
}

export default Footer;
