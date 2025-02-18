import React, { useEffect, useState } from "react";
import CertificateGenerator from "./CertificateGenerator";
import { getContributors } from "../components/contributors/contribution.js";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { XCircle } from "lucide-react"; // Import icon for close button
import TidioChat from "../components/Tidio";

const Contributors = () => {
  const [data, setData] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const getData = async () => {
      const res = await getContributors({});
      if (res) {
        setData(res);
      }
    };

    getData();
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCertificate = (contributor) => {
    setSelectedContributor(contributor);
  };

  return (
    <>
    <TidioChat/>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 relative pt-14">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={200} colors={["#3b82f6", "#1d4ed8", "#FFB800", "#2563eb"]} />
      )}

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400 dark:from-yellow-400 dark:to-orange-500">
            Contributors
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Meet the brilliant minds who brought this project to life!
          </p>
        </div>

        {/* Contributor Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                              shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-500 dark:hover:border-yellow-300">
                <div className="relative flex flex-col items-center">
                  {/* Contributor Avatar */}
                  <img
                    src={item.avatar_url}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700 
                             group-hover:border-blue-500 dark:group-hover:border-yellow-300 transition-all duration-200 shadow-lg"
                    alt={`${item.login}'s avatar`}
                  />
                  
                  {/* Contribution Badge */}
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-yellow-500 dark:to-orange-400 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {item.contributions}
                  </span>
                  
                  {/* Contributor Name */}
                  <span className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-yellow-300 transition-all">
                    {item.login}
                  </span>

                  {/* Certificate Button */}
                  <button
                    className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md 
                              transition-all duration-200 dark:from-yellow-500 dark:to-orange-500 dark:hover:from-yellow-600 dark:hover:to-orange-600"
                    onClick={() => handleAddCertificate(item)}
                  >
                    Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Generator Modal */}
      {selectedContributor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl max-w-lg w-full text-center relative">
            {/* Close Button */}
            <button className="absolute top-3 right-3 text-red-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-all" onClick={() => setSelectedContributor(null)}>
              <XCircle className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-400">
              Certificate for {selectedContributor.login}
            </h2>
            <CertificateGenerator username={selectedContributor.login} />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Contributors;
