import React, { useState, useEffect } from 'react';
import { Heart, Share2, Trash2, Edit2 } from 'lucide-react';

// Helper function to read files and return a base64 URL for preview
const readFile = (file: File) => new Promise<string>((resolve) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(reader.result as string);
  reader.readAsDataURL(file);
});

// Social Media Share Links (for real integrations later)
const shareOnSocialMedia = (postUrl: string) => {
  const encodedUrl = encodeURIComponent(postUrl);
  const shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
  window.open(shareUrl, '_blank');
};

const Profile = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<string>('');
  const [likes, setLikes] = useState<any>({}); // Track likes per post
  const [editingPost, setEditingPost] = useState<any | null>(null); // Track the post being edited
  const [showShareModal, setShowShareModal] = useState<string>(''); // To toggle the share modal and hold URL for sharing

  // Load posts from local storage
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to local storage
  const savePostsToLocalStorage = (posts: any[]) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  // Handle sharing new content
  const handleShareContent = async () => {
    if (!description && !file) return; // Ensure there's a description or file

    const fileUrl = file ? await readFile(file) : '';
    const newPost = {
      id: Date.now().toString(),
      description,
      media_url: fileUrl,
      media_type: mediaType,
      created_at: new Date().toISOString(),
      likes: 0,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);  // Save to local storage
    setDescription('');
    setFile(null);
    setMediaType('');
  };

  // Handle liking a post
  const handleLikePost = (postId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  };

  // Handle deleting a post
  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);  // Update localStorage after deletion
  };

  // Handle editing the description
  const handleEditPost = (post: any) => {
    setEditingPost(post);
  };

  // Handle modal close
  const handleModalClose = () => {
    setEditingPost(null);
  };

  // Handle updating post description
  const handleUpdatePostDescription = () => {
    const updatedPosts = posts.map((post) => {
      if (post.id === editingPost.id) {
        return { ...post, description: editingPost.description };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
    setEditingPost(null); // Close the modal after saving
  };

  // Handle share modal toggle
  const toggleShareModal = (postId: string) => {
    const postUrl = `https://seagro.vercel.app/content`; // Corrected path
    setShowShareModal(postUrl); // Store the generated URL for the post
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* New Post Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
          />
          <div className="flex items-center space-x-4">
            <button
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center text-teal-600 hover:text-teal-700"
            >
              <span>Upload Image</span>
            </button>
            <button
              onClick={() => document.getElementById('video-upload')?.click()}
              className="flex items-center text-teal-600 hover:text-teal-700"
            >
              <span>Upload Video</span>
            </button>
          </div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setMediaType('image');
              }
            }}
          />
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setMediaType('video');
              }
            }}
          />
          {file && (
            <div className="mt-4">
              <p className="text-gray-600">Preview:</p>
              {mediaType === 'image' ? (
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-96 object-cover rounded-lg" />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>
          )}
          <button
            onClick={handleShareContent}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 mt-4 w-full"
          >
            Share
          </button>
        </div>

        {/* Posts Grid - Pinterest Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                {/* Only show the post description, no username or user info */}
                <div className="text-gray-700 mb-4">
                  {post.description && <p>{post.description}</p>}
                </div>

                {/* Only show image or video layout if there is media */}
                {post.media_type === 'image' && (
                  <img
                    src={post.media_url}
                    alt="Post"
                    className="w-full h-64 object-cover mb-4"
                  />
                )}
                {post.media_type === 'video' && (
                  <video
                    src={post.media_url}
                    controls
                    className="w-full h-64 object-cover mb-4"
                  />
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center space-x-2 text-gray-500 hover:text-teal-600 ${likes[post.id] ? 'text-red-600' : ''}`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{likes[post.id] ? 'Liked' : 'Like'}</span>
                  </button>
                  <button
                    onClick={() => toggleShareModal(post.id)} // Generate the URL for sharing
                    className="flex items-center space-x-2 text-gray-500 hover:text-teal-600"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Edit/Delete Options */}
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => handleEditPost(post)}
                  className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <Edit2 className="h-5 w-5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h3 className="text-lg font-bold mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <button onClick={() => window.open(`https://www.instagram.com/?url=${encodeURIComponent(showShareModal)}`, '_blank')} className="text-teal-600">
                Instagram
              </button>
              <button onClick={() => window.open(`https://www.snapchat.com/share?url=${encodeURIComponent(showShareModal)}`, '_blank')} className="text-teal-600">
                Snapchat
              </button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(showShareModal)}`, '_blank')} className="text-teal-600">
                Facebook
              </button>
              <button onClick={() => shareOnSocialMedia(showShareModal)} className="text-teal-600">
                WhatsApp
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowShareModal('')}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
