import React, { useState } from 'react';
import { Button } from '../ui/button';
import { searchYouTube, isYouTubeApiConfigured, YouTubeVideo } from '../../services/youtubeApi';
import { FaYoutube } from 'react-icons/fa';
import { Search, Play, X } from 'lucide-react';

export default function YouTubePlayerWidget() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isYouTubeApiConfigured();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchYouTube(searchQuery, 5);
      setVideos(results.items);
    } catch (err: any) {
      setError(err.message || 'Failed to search YouTube');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setVideos([]);
    setSearchQuery('');
  };

  const handleClear = () => {
    setSelectedVideo(null);
    setVideos([]);
    setSearchQuery('');
    setError(null);
  };

  if (!isConfigured) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
        <FaYoutube size={48} color="#FF0000" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-[#5a5348]">YouTube Integration</h3>
          <p className="text-sm text-[#7a7368] max-w-xs">
            To enable YouTube integration:
          </p>
          <ol className="text-xs text-[#7a7368] list-decimal list-inside space-y-1 text-left max-w-xs mt-2">
            <li>Get API key from Google Cloud Console</li>
            <li>Enable YouTube Data API v3</li>
            <li>Add VITE_YOUTUBE_API_KEY to .env</li>
            <li>Restart the development server</li>
          </ol>
        </div>
        <a 
          href="https://console.cloud.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#FF0000] hover:bg-[#cc0000] text-white font-medium text-sm transition-colors"
        >
          Get API Key
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      {selectedVideo ? (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#5a5348] flex items-center gap-2">
              <FaYoutube className="text-[#FF0000]" size={20} />
              Now Playing
            </h3>
            <Button 
              onClick={handleClear}
              className="p-1.5 rounded-lg hover:bg-[#B6AE9F]/20 text-[#7a7368]"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <h4 className="font-semibold text-[#5a5348] mb-2">{selectedVideo.title}</h4>
            <p className="text-sm text-[#7a7368] mb-2">{selectedVideo.channelTitle}</p>
            <p className="text-xs text-[#7a7368] line-clamp-3">{selectedVideo.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <FaYoutube size={24} color="#FF0000" />
              <h3 className="font-semibold text-[#5a5348]">Search YouTube</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for videos..."
                className="flex-1 p-2 rounded-lg bg-white border border-[#C5C7BC] focus:ring-2 focus:ring-[#B6AE9F] focus:outline-none text-sm text-[#5a5348]"
              />
              <Button 
                onClick={handleSearch} 
                disabled={isLoading || !searchQuery.trim()}
                className="bg-[#FF0000] hover:bg-[#cc0000] text-white p-2 rounded-lg"
              >
                <Search size={18} />
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B6AE9F]"></div>
            </div>
          ) : videos.length > 0 && (
            <div className="flex-1 overflow-y-auto space-y-2">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className="w-full flex gap-3 p-3 rounded-lg bg-white hover:bg-[#FBF3D1] border border-[#C5C7BC] hover:border-[#B6AE9F] transition-all duration-200 text-left group"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-[#5a5348] line-clamp-2 mb-1 group-hover:text-[#B6AE9F]">
                      {video.title}
                    </h4>
                    <p className="text-xs text-[#7a7368]">{video.channelTitle}</p>
                  </div>
                  <Play className="text-[#B6AE9F] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

