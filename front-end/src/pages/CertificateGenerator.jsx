import React, { useRef, useEffect, useState } from "react";
import { toPng } from "html-to-image";
import backgroundImage from "../assets/logo.png";

const CertificateGenerator = ({ username }) => {
  const certificateRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      if (!username) {
        setError("Username is missing.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("GitHub profile not found");

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProfile();
  }, [username]);

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      const dataUrl = await toPng(certificateRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${username}_certificate.png`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={certificateRef}
        className="w-[650px] h-[450px] border-4 border-blue-600 bg-white p-8 shadow-2xl text-gray-900 relative rounded-xl flex flex-col items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>

        <h1 className="text-3xl font-bold text-blue-700 mb-2 relative">
          Certificate of Appreciation
        </h1>
        <p className="text-lg text-gray-700 relative">This is proudly presented to</p>

        {loading && <p className="text-gray-500 mt-4 relative">Fetching GitHub Profile...</p>}
        {error && <p className="text-red-500 mt-4 relative">{error}</p>}

        {profile && !loading && (
          <div className="flex flex-col items-center mt-4 relative">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
              <img
                src={profile.avatar_url}
                alt={`${username}'s GitHub`}
                className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
                crossOrigin="anonymous"
              />
            </a>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">
              {profile.name || username}
            </h2>
            <p className="text-gray-600">@{username}</p>
          </div>
        )}

        <p className="mt-4 text-lg text-gray-700 text-center px-4 relative">
          For valuable contributions to react-blog Project in Social Winter of Code (SWoC) from January 1, 2025 to March 1, 2025.
        </p>

        <div className="mt-8 flex justify-between w-full px-6 text-gray-700 relative">
          <div className="text-left">
            <p className="font-semibold text-sm">Project Mentor</p>
            <p className="text-sm">OkenHaha</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm">Date</p>
            <p className="text-sm">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownloadCertificate}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-200"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateGenerator;