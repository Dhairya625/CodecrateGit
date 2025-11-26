# YouTube API Integration Setup Guide

## 📋 Prerequisites
- Google Cloud account
- Access to Google Cloud Console

## 🚀 Setup Steps

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "CodeCrate")
4. Click "Create"

### 2. Enable YouTube Data API v3
1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

### 3. Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "+ Create Credentials" → "API Key"
3. Copy your API key

### 4. Configure Environment Variables

#### Create `.env` file in the root directory:

```bash
VITE_YOUTUBE_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your actual API key from step 3.

### 5. Secure Your API Key (Recommended)
1. Go back to "Credentials" in Google Cloud Console
2. Click on your API key to edit it
3. Under "API restrictions", select "Restrict key"
4. Choose "YouTube Data API v3"
5. Under "Application restrictions", you can add:
   - HTTP referrers (for web apps)
   - IP addresses
6. Save changes

### 6. Restart Your Development Server
```bash
npm run dev
```

## 📊 API Quotas & Limits

### Free Tier
- **Daily quota:** 10,000 units
- **Search request:** 100 units
- **Video details:** 1 unit per video
- **Estimated:** ~100 searches per day (free tier)

### Usage
Each search in the YouTube widget uses 100 quota units, so you can perform approximately 100 searches per day on the free tier.

## 🎯 Features

✅ Search YouTube videos  
✅ Play videos in widget  
✅ View video details  
✅ Responsive design  
✅ Error handling  

## 🔒 Security Best Practices

1. **Never commit your `.env` file to version control**
   - Add `.env` to your `.gitignore`
   
2. **Restrict your API key**
   - Limit to specific APIs
   - Add referrer/IP restrictions
   
3. **Monitor usage**
   - Check quota usage in Google Cloud Console
   - Set up alerts for unusual activity

## 🐛 Troubleshooting

### "YouTube API key not found" error
- Make sure `.env` file exists in the root directory
- Verify the file is named exactly `.env` (not `.env.txt`)
- Restart the development server after creating `.env`
- Check that the variable name is `VITE_YOUTUBE_API_KEY`

### "YouTube API error" messages
- Verify your API key is correct
- Check that YouTube Data API v3 is enabled
- Check quota limits in Google Cloud Console
- Verify API restrictions haven't blocked your domain/IP

### Videos not loading
- Check browser console for errors
- Verify network connectivity
- Check if the video is available/unblocked in your region

## 📚 Additional Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google Cloud Console](https://console.cloud.google.com)
- [API Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)

## 🔄 Next Steps

Once set up, you can:
1. Drag the YouTube widget from the sidebar
2. Search for any video
3. Select and play videos directly in the widget
4. Enjoy distraction-free study sessions with YouTube!

