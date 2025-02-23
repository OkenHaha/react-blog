import { useEffect, useState } from "react";
import axios from "axios";
import { link } from "../Baselink";

const SaveForLaterButton = ({ articleId, usertoken }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isArticlePresent, setIsArticlePresent] = useState(false);

  useEffect(() => {
    axios
      .get(`${link}/api/auth/getProfile`, { headers: { authorization: usertoken } })
      .then((response) => {
        if (response.data.user.saveForLater.includes(articleId)) {
          setIsArticlePresent(true);
        }
      })
      .catch((err) => console.error(err));
  }, [articleId, usertoken]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${link}/api/article/saveforlater`,
        { id: articleId },
        { headers: { authorization: usertoken } }
      );

      setMessage(response.data.message || "Article saved successfully");
      setIsArticlePresent(true);
    } catch (error) {
      setMessage("Failed to save article");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${link}/api/article/removefromlater`,
        { id: articleId },
        { headers: { authorization: usertoken } }
      );

      setMessage(response.data.message || "Article removed successfully");
      setIsArticlePresent(false);
    } catch (error) {
      setMessage("Failed to remove article");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <button
        onClick={isArticlePresent ? handleRemove : handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        disabled={isSaving}
      >
        {isSaving ? "Processing..." : isArticlePresent ? "Remove" : "Save for Later"}
      </button>
      {message && <p className="text-sm text-gray-200 mt-2">{message}</p>}
    </div>
  );
};

export default SaveForLaterButton;
