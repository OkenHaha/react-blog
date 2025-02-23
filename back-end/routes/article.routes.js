import { Router } from "express";
import { getarticles, addcomments,addArticle, getAllArticles, editArticle, getarticlebyid, deleteArticle, getarticlesbyuser, likeArticle, getArticleByTag, saveforlater, saveasdraft, getUserDrafts, getsaveforlater, removeSaveforLater, recentComments, addReaction, removeReaction, getReactions } from "../controllers/article.controller.js";
import multer from 'multer'
import { upload_on_cloudinary } from "../utils/cloudinary.js";
import { Check_add_achievement, Check_add_achievement_comments, Check_add_achievement_liked } from "../middleware/achievement.middleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const articleRouter = Router()

// add article route
articleRouter.post('/addarticle', Check_add_achievement, upload.single("thumbnail"), addArticle); 

// get article route
articleRouter.post('/getarticle', getarticles);

// get all article route
articleRouter.get('/getallarticle', getAllArticles);

//get article by specfic user
articleRouter.post("/getarticlesbyuser", getarticlesbyuser)

// add comment route
articleRouter.post('/addcomment', Check_add_achievement_comments, addcomments);

//edit article
articleRouter.post('/editarticle', upload.single("thumbnail") ,editArticle)

//get article by id
articleRouter.post('/getarticlebyid', getarticlebyid)

// delete article
articleRouter.delete('/deletearticle', deleteArticle);

// Like/Unlike article route
articleRouter.post('/like/:articleId', Check_add_achievement_liked, likeArticle);

articleRouter.post('/getarticlebytag',getArticleByTag);
    

//add to save for later
articleRouter.post('/saveforlater', saveforlater)

//save as draft
articleRouter.post('/create-draft', upload.single('thumbnail') ,saveasdraft)

//get user drafts
articleRouter.get('/drafts', getUserDrafts)

//get save for later articles
articleRouter.get('/getsavedlarticles', getsaveforlater)

//remove a article from savefor later
articleRouter.post('/removeSavedArticle', removeSaveforLater)

//get recent comments
articleRouter.get('/getrecentomment/:id', recentComments)

// Add reaction routes
articleRouter.post('/react/:articleId', addReaction);
articleRouter.delete('/react/:articleId', removeReaction);
articleRouter.get('/reactions/:articleId', getReactions);

export { articleRouter };