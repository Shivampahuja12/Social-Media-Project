import React, { useState, useEffect } from 'react';
import { Search, X, Plus, Sun, Moon, Trash2, MoreHorizontal, ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';

const samplePosts = [
  {
    community: "r/SportsIndia",
    communityIcon: "🏏",
    title: "India wins the world cup!",
    content: "Amazing performance by the team",
    image: null,
    timeAgo: "2 hours ago"
  },
  {
    community: "r/Pikachu",
    communityIcon: "⚡",
    title: "New Pikachu evolution discovered",
    content: "Check out this amazing discovery",
    image: null,
    timeAgo: "5 hours ago"
  },
  {
    community: "r/memeIndia",
    communityIcon: "😂",
    title: "Funny memes of the week",
    content: "Here are the best memes",
    image: null,
    timeAgo: "1 day ago"
  }
];

const RedditClone = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());
  
  // Form state
  const [formData, setFormData] = useState({
    community: 'r/SportsIndia',
    title: '',
    content: '',
    image: ''
  });

  // Initialize posts
  useEffect(() => {
    const savedPosts = localStorage.getItem('reddixPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(samplePosts);
      localStorage.setItem('reddixPosts', JSON.stringify(samplePosts));
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.community.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const getCommunityIcon = (community) => {
    const icons = {
      'r/SportsIndia': '🏏',
      'r/Pikachu': '⚡',
      'r/memeIndia': '😂',
      'r/cplusplus': '💻',
      'r/English': '📚'
    };
    return icons[community] || '📱';
  };

  const handleCreatePost = () => {
    if (!formData.title.trim()) {
      alert('Please add a title to your post');
      return;
    }

    const newPost = {
      community: formData.community,
      communityIcon: getCommunityIcon(formData.community),
      title: formData.title,
      content: formData.content,
      image: formData.image || null,
      timeAgo: 'Just now'
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('reddixPosts', JSON.stringify(updatedPosts));

    // Reset form and close modal
    setFormData({ community: 'r/SportsIndia', title: '', content: '', image: '' });
    setIsModalOpen(false);
  };

  const handleDeletePost = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
      localStorage.setItem('reddixPosts', JSON.stringify(updatedPosts));
    }
  };

  const toggleJoin = (community) => {
    const newJoined = new Set(joinedCommunities);
    if (newJoined.has(community)) {
      newJoined.delete(community);
    } else {
      newJoined.add(community);
    }
    setJoinedCommunities(newJoined);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">{part}</mark> : part
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-xl font-bold">ReddiX</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search ReddiX"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                <Plus size={20} />
                <span>Create</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 space-y-4">
            <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow`}>
              <h3 className="font-bold mb-3">Home</h3>
              <div className="space-y-2">
                {['Home', 'Answers', 'Explore', 'ALL'].map(item => (
                  <div key={item} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow`}>
              <h3 className="font-bold mb-3">Communities</h3>
              <div className="space-y-2">
                {['r/Pikachu', 'r/memeIndia', 'r/cplusplus', 'r/English'].map(community => (
                  <div key={community} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
                    <span className="text-xl">{getCommunityIcon(community)}</span>
                    <span className="text-sm">{community}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Posts Feed */}
          <main className="col-span-9 space-y-4">
            {searchTerm && (
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                <p className="text-sm text-gray-400">
                  {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found for "{searchTerm}"
                </p>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className={`p-12 text-center rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-400">Try searching for something else</p>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <div key={index} className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow overflow-hidden`}>
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{post.communityIcon}</span>
                      <div>
                        <span className="font-semibold">{post.community}</span>
                        <span className="text-gray-400 text-sm ml-2">• {post.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleJoin(post.community)}
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          joinedCommunities.has(post.community)
                            ? 'bg-gray-600 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {joinedCommunities.has(post.community) ? 'Joined' : 'Join'}
                      </button>
                      <button
                        onClick={() => handleDeletePost(index)}
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <h2 className="text-lg font-semibold mb-2">
                      {highlightText(post.title, searchTerm)}
                    </h2>
                    {post.content && (
                      <p className="text-gray-400">{post.content}</p>
                    )}
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-4 pb-3">
                      <img src={post.image} alt="Post" className="rounded-lg w-full" />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 px-4 py-3 border-t border-gray-700">
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-1 rounded">
                      <ThumbsUp size={18} />
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-1 rounded">
                      <MessageSquare size={18} />
                      <span className="text-sm">Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-1 rounded">
                      <Bookmark size={18} />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Create a post</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Choose a community</label>
                <select
                  value={formData.community}
                  onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                  className={`w-full p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                >
                  <option value="r/SportsIndia">r/SportsIndia</option>
                  <option value="r/Pikachu">r/Pikachu</option>
                  <option value="r/memeIndia">r/memeIndia</option>
                  <option value="r/cplusplus">r/cplusplus</option>
                  <option value="r/English">r/English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Add a title"
                  className={`w-full p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Post content (optional)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What would you like to post?"
                  rows="4"
                  className={`w-full p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Image URL (optional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Paste image URL here"
                  className={`w-full p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-6 py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:bg-gray-600`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedditClone;