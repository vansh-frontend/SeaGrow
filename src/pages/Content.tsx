// ContentSharing.tsx
import React, { useState, useEffect } from 'react';

const ContentSharing = () => {
  const [posts, setPosts] = useState<any[]>([]);

  // Fetch posts from local storage or API
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Content Sharing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              {/* Post description */}
              {post.description && <p className="text-gray-700">{post.description}</p>}

              {/* Display media */}
              {post.media_type === 'image' && (
                <img src={post.media_url} alt="Post" className="w-full h-64 object-cover mb-4" />
              )}
              {post.media_type === 'video' && (
                <video src={post.media_url} controls className="w-full h-64 object-cover mb-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSharing;
