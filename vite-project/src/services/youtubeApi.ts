/**
 * YouTube Data API v3 Integration
 * 
 * Setup Instructions:
 * 1. Get API key from https://console.cloud.google.com
 * 2. Enable "YouTube Data API v3"
 * 3. Create a .env file in the root directory
 * 4. Add: VITE_YOUTUBE_API_KEY=your_api_key_here
 * 
 * API Quotas:
 * - Default: 10,000 units per day
 * - Search: 100 units per request
 * - Video: 1 unit per request
 */

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

/**
 * Search for YouTube videos
 */
export async function searchYouTube(query: string, maxResults: number = 10): Promise<YouTubeSearchResponse> {
  if (!API_KEY) {
    throw new Error('YouTube API key not found. Please add VITE_YOUTUBE_API_KEY to your .env file');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&type=video&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      items: data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      })),
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error('YouTube API error:', error);
    throw error;
  }
}

/**
 * Get video details by ID
 */
export async function getVideoDetails(videoId: string) {
  if (!API_KEY) {
    throw new Error('YouTube API key not found');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('YouTube API error:', error);
    throw error;
  }
}

/**
 * Check if API key is configured
 */
export function isYouTubeApiConfigured(): boolean {
  return !!API_KEY && API_KEY !== 'your_youtube_api_key_here';
}

