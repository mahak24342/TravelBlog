'use client'
import { useState } from 'react'
import { PlusCircle, X, Edit, Trash2 } from 'lucide-react'
import Share from './Share'

// Mock data for blog posts
const initialBlogs = [
  { id: 1, title: "Exploring the Hidden Beaches of Bali", excerpt: "Discover secluded paradises away from the tourist crowds...", imageUrl: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "A Food Tour Through the Streets of Tokyo", excerpt: "Indulge in the flavors of Japan's vibrant capital...", imageUrl: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Hiking the Inca Trail: A Journey to Machu Picchu", excerpt: "Follow in the footsteps of ancient civilizations...", imageUrl: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Safari Adventures in the Serengeti", excerpt: "Witness the majesty of Africa's wildlife up close...", imageUrl: "/placeholder.svg?height=200&width=300" },
]

export default function BlogList() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', imageUrl: '' }) // Added imageUrl here

  const handleAddBlog = (e) => {
    e.preventDefault()
    if (editingBlog) {
      // If editing, update the existing blog
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? { ...editingBlog, ...newBlog } : blog))
      setEditingBlog(null)
    } else {
      // If adding a new blog, generate a new ID and add the new blog to the list
      const id = blogs.length + 1
      const newBlogWithId = { ...newBlog, id }
      setBlogs([...blogs, newBlogWithId])
    }
    // Reset the newBlog state and close the modal
    setNewBlog({ title: '', excerpt: '', imageUrl: '' })
    setIsModalOpen(false)
  }

  const handleEditBlog = (blog) => {
    setEditingBlog(blog)
    setNewBlog({ title: blog.title, excerpt: blog.excerpt, imageUrl: blog.imageUrl }) // Include imageUrl when editing
    setIsModalOpen(true)
  }

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Travel Blog Posts</h1>
       
        <button
          onClick={() => {
            setEditingBlog(null)
            setNewBlog({ title: '', excerpt: '', imageUrl: '' }) // Reset the form for adding a new blog
            setIsModalOpen(true)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Blog
        </button>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={blog.imageUrl || '/placeholder.svg'} alt={blog.title} className="w-full h-48 object-cover" /> {/* Display the image */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-end space-x-2">
              
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="text-blue-500 hover:text-blue-600"
                  aria-label="Edit blog post"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Delete blog post"
                >
                  <Trash2 size={20} />
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBlog}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Excerpt</label>
                <textarea
                  id="excerpt"
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newBlog.imageUrl}
                  onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {editingBlog ? 'Update Blog Post' : 'Add Blog Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
