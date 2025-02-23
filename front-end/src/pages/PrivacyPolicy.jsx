import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-[#141b28] min-h-screen flex justify-center items-center px-5 py-10 pt-24">
      <div className="max-w-6xl w-full bg-white dark:bg-[#00001c] shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden p-6">
        {/* Left Section for Image (Hidden on Mobile) */}
        <div className="w-full md:w-2/5 bg-gray-100 dark:bg-[#1a2332] p-6 hidden md:flex flex-col items-center">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg"
            alt="Privacy Illustration"
            className="w-full rounded-lg mb-4"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau28_GXYA1DEeVWt14zMA4ztRzKvdUXcpCf15AjTFCdyArIopLUos_Bk9MF1WYA8vwU4&usqp=CAU"
            alt="Privacy Illustration"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Section - Privacy Policy Content */}
        <div className="w-full md:w-3/5 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-yellow-400 mb-4">
            Privacy Policy
          </h1>

          {/* Sections */}
          {[
            {
              title: "Welcome to React Blog",
              content:
                "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform. By accessing or using React Blog, you agree to the terms outlined in this policy.",
            },
            {
              title: "Information We Collect",
              content:
                "We collect different types of information, including personal details (name, email), user-generated content (blog posts, comments, likes), technical data (IP, browser type), and usage analytics.",
            },
            {
              title: "How We Use Your Information",
              content:
                "We use your data to provide and improve our services, personalize content, enhance security, respond to inquiries, and comply with legal requirements.",
            },
            {
              title: "Sharing Your Information",
              content:
                "We do not sell or share your personal data. However, we may share anonymized, aggregated data with partners for platform improvements.",
            },
            {
              title: "Security",
              content:
                "We implement strong security measures including encryption, access controls, and periodic security audits to protect user data.",
            },
            {
              title: "Your Rights",
              content:
                "You have the right to access, update, or delete your personal information. Contact us for any privacy-related requests.",
            },
            {
              title: "Changes to This Policy",
              content:
                "We may update this Privacy Policy from time to time. Any changes will be posted here, and we encourage users to review it periodically.",
            },
          ].map((section, index) => (
            <div
              key={index}
              className=" dark:bg-[#1a2332] p-4 mt-7 rounded-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-yellow-400">
                {index + 1}. {section.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 pt-4">{section.content}</p>
            </div>
          ))}

          {/* Contact Section */}
          <section className="text-center mt-7">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-yellow-400">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300">📧 support@reactblog.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}