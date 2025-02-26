import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, BookOpen, Lock, UserCheck, Bell, RefreshCw } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Welcome to React Blog's Privacy Policy",
      content:
        "At React Blog, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our blogging platform. By using React Blog, you agree to the practices described in this policy.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Information We Collect",
      content: `We collect various types of information to provide and improve our services:

• Personal Information: Name, email address, profile picture, and optional biographical information
• Account Information: Username, password (encrypted), and account preferences
• Content Data: Articles, comments, likes, and other content you create
• Usage Data: Reading history, interaction patterns, and feature usage
• Technical Data: IP address, browser type, device information, and cookies
• Analytics: Time spent on platform, articles read, and engagement metrics`,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: `We use your information for the following purposes:

• Providing our core blogging services
• Personalizing your content experience
• Improving our platform features
• Sending important notifications
• Processing article submissions
• Analyzing platform usage patterns
• Protecting against unauthorized access
• Communicating platform updates`,
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Information Sharing",
      content: `We are committed to protecting your privacy and will never sell your personal data. We may share information in these limited circumstances:

• With your explicit consent
• To comply with legal obligations
• To protect our rights and safety
• With service providers who assist our operations
• In anonymized, aggregated form for analytics`,
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Your Privacy Rights",
      content: `You have several rights regarding your personal data:

• Access your personal information
• Correct inaccurate data
• Request deletion of your data
• Export your data
• Opt-out of marketing communications
• Control cookie preferences
• Manage notification settings`,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: `We implement robust security measures to protect your data:

• End-to-end encryption for sensitive data
• Regular security audits and updates
• Secure data storage and transmission
• Access controls and authentication
• Regular backup procedures
• Incident response protocols
• Employee security training`,
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Updates to This Policy",
      content: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any significant changes through the platform or via email.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#141b28] min-h-screen flex justify-center items-center px-5 py-10 pt-24">
      <div className="max-w-6xl w-full bg-white dark:bg-[#00001c] shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section for Image */}
        <div className="w-full md:w-2/5 bg-gray-100 dark:bg-[#1a2332] p-6 hidden md:flex flex-col items-center justify-between">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg"
            alt="Privacy Policy"
            className="w-full rounded-lg mb-4"
          />
          <div className="space-y-4 w-full">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-yellow-400 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                If you have questions about our privacy practices, please contact us:
              </p>
              <div className="flex items-center mt-2 text-blue-600 dark:text-yellow-400">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:support@reactblog.com">support@reactblog.com</a>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-yellow-400 mb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-blue-600 dark:text-yellow-400 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-blue-600 dark:text-yellow-400 hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-blue-600 dark:text-yellow-400 hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Privacy Policy Content */}
        <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto max-h-[800px]">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-yellow-400 mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-[#1a2332] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600 dark:text-yellow-400">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-yellow-400">
                    {section.title}
                  </h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}