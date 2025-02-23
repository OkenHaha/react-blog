import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const AchievementPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/achievement/getachievements");
        setAchievements(response.data.fetchedAchievements);
      } catch (err) {
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-100 p-10 flex flex-col items-center">
      <div className="mt-16"></div>
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement._id}
            className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center cursor-pointer border border-purple-300 hover:shadow-purple-400 hover:shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, boxShadow: "0px 0px 15px rgba(128, 0, 128, 0.5)" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(128, 0, 255, 0.8)" }}
            onClick={() => setSelectedAchievement(achievement)}
          >
            <motion.img 
              src={achievement.image} 
              alt={achievement.name} 
              className="w-24 h-24 mb-4" 
              animate={{ scaleX: [1, -1, 1] }} 
              transition={{ duration: 0.6, repeat: 1 }}
            />
            <h3 className="text-lg font-semibold text-purple-700 text-center">{achievement.name}</h3>
            <p className="text-gray-500 text-sm">{new Date(achievement.achevedOn).toLocaleDateString()}</p>
            <p className="mt-3 text-gray-700 text-center">{achievement.description}</p>
          </motion.div>
        ))}
      </div>

      {selectedAchievement && (
        <Dialog open={true} onClose={() => setSelectedAchievement(null)} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
            <motion.img 
              src={selectedAchievement.image} 
              alt={selectedAchievement.name} 
              className="w-24 h-24 mb-4" 
              animate={{ scaleX: [1, -1, 1] }} 
              transition={{ duration: 0.6, repeat: 1 }}
            />
            <Dialog.Title className="text-xl font-bold text-purple-700">{selectedAchievement.name}</Dialog.Title>
            <p className="text-gray-500 mt-2">Achieved on: {new Date(selectedAchievement.achevedOn).toLocaleDateString()}</p>
            <p className="mt-4 text-center text-gray-700">{selectedAchievement.description}</p>
            <button 
              onClick={() => setSelectedAchievement(null)} 
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default AchievementPage;
