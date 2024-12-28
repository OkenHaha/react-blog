import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Links Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-green-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <ul >
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul >
              <li>
                Contact: 1234567891
              </li>
              <li>
                Email:dummy@gmail.com
              </li>
              <li>
                Office:XXXXXXX
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-green-700 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} React-blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
