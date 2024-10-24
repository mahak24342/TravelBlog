import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this blog post.'],
  },
  imageUrl: {
    type: String,
    
  },
}, {
  timestamps: true,
});

const Bloggi= mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Bloggi;