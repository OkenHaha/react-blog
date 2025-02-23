import React, { useState, useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { link } from '../components/Baselink';
import { Clock, TrendingUp, Users, ThumbsUp, MessageSquare, Award, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    labels: [],
    published: [],
    liked: [],
    comments: []
  });
  const [categoryStats, setCategoryStats] = useState({
    labels: [],
    counts: []
  });
  const [readingTimeStats, setReadingTimeStats] = useState({
    labels: [],
    times: []
  });
  const [engagementRate, setEngagementRate] = useState(0);
  const url = `${link}`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        
        const userResponse = await axios.get(`${url}/api/auth/getProfile`, {
          headers: { Authorization: token }
        });
        console.log(userResponse.data)
        setUser(userResponse.data.user);

        
        const articlesResponse = await axios.post(
          `${url}/api/article/getarticlesbyuser`,
          { uid: userResponse.data.user._id }
        );
        const articles = articlesResponse.data.articleDetails;
        setUserArticles(articles);

        
        processAllStats(articles);

        
        const commentsResponse = await axios.get(
          `${url}/api/article/getrecentomment/${userResponse.data.user._id}`,
          { headers: { Authorization: token } }
        );
        console.log(commentsResponse.data.comments)
        setRecentComments(commentsResponse.data.comments);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const processAllStats = (articles) => {
    
    const monthlyData = processMonthlyStats(articles);
    setMonthlyStats(monthlyData);

    
    const categoryData = processCategoryStats(articles);
    setCategoryStats(categoryData);

    
    const readingData = processReadingTimeStats(articles);
    setReadingTimeStats(readingData);

    
    const totalEngagement = articles.reduce((sum, article) => {
      return sum + (article.likes?.length || 0) + (article.comments?.length || 0);
    }, 0);
    const rate = articles.length > 0 
      ? ((totalEngagement / articles.length) * 100).toFixed(2)
      : 0;
    setEngagementRate(rate);
  };

  const processMonthlyStats = (articles) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const stats = {
      labels: [],
      published: [],
      liked: [],
      comments: []
    };

    
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      stats.labels.push(monthNames[month.getMonth()]);
      
      
      const monthArticles = articles.filter(article => {
        const articleDate = new Date(article.createdAt);
        return articleDate.getMonth() === month.getMonth() &&
               articleDate.getFullYear() === month.getFullYear();
      });

      stats.published.push(monthArticles.length);
      
      
      const monthLikes = monthArticles.reduce((sum, article) => 
        sum + (article.likes?.length || 0), 0);
      const monthComments = monthArticles.reduce((sum, article) => 
        sum + (article.comments?.length || 0), 0);

      stats.liked.push(monthLikes);
      stats.comments.push(monthComments);
    }

    return stats;
  };

  const processCategoryStats = (articles) => {
    const categoryCount = {};
    articles.forEach(article => {
      if (article.tag) {
        categoryCount[article.tag] = (categoryCount[article.tag] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(categoryCount),
      counts: Object.values(categoryCount)
    };
  };

  const processReadingTimeStats = (articles) => {
    const timeRanges = ['0-5 min', '5-10 min', '10-15 min', '15+ min'];
    const counts = [0, 0, 0, 0];

    articles.forEach(article => {
      const readingTime = article.readingTime || 0;
      if (readingTime <= 5) counts[0]++;
      else if (readingTime <= 10) counts[1]++;
      else if (readingTime <= 15) counts[2]++;
      else counts[3]++;
    });

    return {
      labels: timeRanges,
      times: counts
    };
  };

  const getPerformanceLevel = (articles) => {
    const totalLikes = articles.reduce((sum, article) => 
      sum + (article.likes?.length || 0), 0);
    const avgLikes = articles.length > 0 ? totalLikes / articles.length : 0;
    
    if (avgLikes >= 10) return "Outstanding";
    if (avgLikes >= 7) return "Excellent";
    if (avgLikes >= 5) return "Good";
    return "Getting Started";
  };

  
  const activityGraphData = {
    labels: monthlyStats.labels,
    datasets: [
      {
        label: "Articles Published",
        data: monthlyStats.published,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Likes Received",
        data: monthlyStats.liked,
        backgroundColor: "rgba(168, 85, 247, 0.6)",
        borderColor: "rgba(168, 85, 247, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments Received",
        data: monthlyStats.comments,
        backgroundColor: "rgba(251, 146, 60, 0.6)",
        borderColor: "rgba(251, 146, 60, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryGraphData = {
    labels: categoryStats.labels,
    datasets: [{
      data: categoryStats.counts,
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(251, 146, 60, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(239, 68, 68, 0.6)',
      ],
      borderWidth: 1,
    }],
  };

  const readingTimeGraphData = {
    labels: readingTimeStats.labels,
    datasets: [{
      label: 'Number of Articles',
      data: readingTimeStats.times,
      borderColor: 'rgba(59, 130, 246, 1)',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    }],
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 px-4 sm:px-8 py-4"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20 mb-8"
      >
        <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-lg">Content Creator Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your writing journey and impact</p>
      </motion.div>

      {/* Profile Overview */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-xl p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-indigo-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center border-2 border-indigo-500">
                <span className="text-indigo-700 text-xl font-semibold">
                  {user.name?.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.authorLevel?.levelName || 'Author'}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full">
              Performance Level: {getPerformanceLevel(userArticles)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickStatCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Total Articles"
          value={userArticles.length}
          change="+2 this month"
          color="blue"
        />
        <QuickStatCard
          icon={<ThumbsUp className="w-6 h-6" />}
          title="Total Likes"
          value={user?.likedArticles?.length || 0}
          change="+15 this month"
          color="purple"
        />
        <QuickStatCard
          icon={<MessageSquare className="w-6 h-6" />}
          title="Comments"
          value={recentComments.length}
          change="+5 this week"
          color="orange"
        />
        <QuickStatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Engagement Rate"
          value={`${engagementRate}%`}
          change="+2.5% from last month"
          color="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Activity Overview */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h3>
          <Bar data={activityGraphData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: false }
            }
          }} />
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Category Distribution</h3>
          <Doughnut data={categoryGraphData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'right' }
            }
          }} />
        </motion.div>

        {/* Reading Time Distribution */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Reading Time Distribution</h3>
          <Line data={readingTimeGraphData} options={{
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {userArticles.slice(0, 5).map(article => (
              <motion.div
                key={article._id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">{article.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{article.likes?.length || 0}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{article.comments?.length || 0}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-xl shadow-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Your Achievements</h3>
          <button
            onClick={() => navigate('/achievements')}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {user.achievements?.slice(0, 3).map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 flex items-center space-x-4"
            >
              <Award className="w-8 h-8 text-indigo-600" />
              <div>
                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Comments Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-xl shadow-xl p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Comments</h3>
        <div className="space-y-4">
          {recentComments.slice(0, 3).map((comment, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="border-l-4 border-indigo-500 pl-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-800">{comment.username || 'Anonymous'}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{comment.content}</p>
              <button
                onClick={() => navigate(`/article/${comment.article?.name}`)}
                className="text-indigo-600 text-sm mt-2 hover:text-indigo-800 transition-colors"
              >
                View Article
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-article')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
        >
          Create New Article
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/edit-profile')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        >
          Edit Profile
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/analytics')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          View Detailed Analytics
        </motion.button>
      </div>
    </motion.div>
  );
}


const QuickStatCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${colorClasses[color]} rounded-xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm mt-2">{change}</p>
      </div>
    </motion.div>
  );
};

export default Dashboard;