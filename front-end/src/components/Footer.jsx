import React from "react";
import github from "../assets/github.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
     <footer className="p-8 w-full bg-gradient-to-r from-white to-white dark:from-[#171d30] dark:to-[#001f3d] text-black dark:text-white bg-emerald-500 shadow-lg shadow-emerald-500/50">
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
       

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
            <div className="mx-auto max-w-sm lg:max-w-none">
              <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg dark:text-white dark:hover:text-white/75">
              Share your story, inspire the world. A platform for bloggers and readers.
              </p>

              <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                

                <a
                  className="text-black hover:text-gray-700 dark:text-white dark:hover:text-white/75"
                  href="https://github.com/OkenHaha/react-blog"
                  rel="noreferrer"
                >
                  <span className="sr-only"> GitHub </span>

                  <svg
                    className="size-6"
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

            <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
              <div>
                <strong className="font-medium text-gray-900 dark:text-white dark:hover:text-white/75">
                  {" "}
                  About Us{" "}
                </strong>

                <ul className="mt-6 space-y-1">
                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      href="/"
                    >
                      {" "}
                      Home{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      href="/about"
                    >
                      About
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      href="/article-list"
                    >
                      Articles
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      href="/faq"
                    >
                      FAQ's
                    </a>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      to="/contributors"
                    >
                      Contributors
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                      to="/PrivacyPolicy"
                    >
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>

              

              <div>
                <strong className="font-medium text-gray-900 dark:text-white dark:hover:text-white/75"> Contact us </strong>

                <ul className="mt-6 space-y-1">
                  
                  <li>
                    <a
                      className="text-gray-700 transition hover:text-amber-400 dark:text-white dark:hover:text-white/75"
                      href="mailto:reactblogswoc@gmail.com"
                    >
                      {" "}
                      reactblogswoc@gmail.com{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
