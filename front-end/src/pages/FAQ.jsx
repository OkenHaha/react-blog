import React, { useState } from "react";
import TidioChat from "../components/Tidio";


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is React Blog?",
      answer:
        "React Blog is an online platform where you can explore and share articles on various topics. Whether you're here to read or write, it's your go-to place for insightful and creative content.",
    },
    {
      question: "Can I read articles for free?",
      answer:
        "Absolutely! All the articles on React Blog are available for free. Dive in and enjoy reading without wasting the time.",
    },
    {
      question: "How can I post an article?",
      answer:
        "Posting an article is super simple: If you're new, just sign up for an account. If you're already a member, log in to your account and start writing.",
    },
    {
      question: "Can I read articles without logging in?",
      answer:
        "Yes, you can! You don’t need an account to read articles. Feel free to explore and enjoy the content at any time.",
    },
    {
      question: "How do I start writing an article?",
      answer:
        "Once you're logged in, head over to the 'Create Article' section. Add your title, content, and any images you’d like to include. Then, hit Publish to share your thoughts with the world!",
    },
  ];

  return (
    <>
    <TidioChat/>
    <div className="max-w-5xl mx-auto p-10 pt-20 dark:bg-gray-900 rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-10 mt-12">
        Frequently Asked Questions
      </h1>
      <div className="faq-section flex flex-col space-y-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-all hover:shadow-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-cyan-700 dark:hover:text-cyan-300">
                {faq.question}
              </h2>
              {/* Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-gray-700 dark:text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default FAQ;
