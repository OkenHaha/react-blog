import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Column 1 */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400"
                >
                  Instagram
                </a>
              </li>
              <li>
                {/* <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  LinkedIn
                </a> */}
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full sm:w-1/3">
            <h4 className="text-lg font-bold mb-4">About</h4>
            <p className="text-sm">
              Welcome to our blog, where we share the latest updates, stories,
              and insights. Join us on our journey to explore ideas, creativity,
              and knowledge. #SWOC'25
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} React Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
