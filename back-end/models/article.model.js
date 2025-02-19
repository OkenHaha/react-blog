import mongoose from 'mongoose';
/*
Predefined Tags
Technology
Gaming
Music
Movies
*/
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName:{type: String},
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  ],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tag:{type:String},
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  reactions: [{
    emoji: { 
      type: String,
      enum: ['👍', '❤️', '😂', '😮', '😢', '😡']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
},{timestamps:true});

articleSchema.methods.getReactionCounts = function() {
  const counts = {};
  this.reactions.forEach(reaction => {
    counts[reaction.emoji] = (counts[reaction.emoji] || 0) + 1;
  });
  return counts;
};

const Article = mongoose.model('Article', articleSchema);

export { Comment, Article };