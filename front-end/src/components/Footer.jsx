import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are committed to delivering the best user experience. Stay connected with us for updates and support.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
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

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2025 SWOC'25. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
