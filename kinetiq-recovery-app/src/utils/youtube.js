// Helper function to extract YouTube video ID from various URL formats
export function extractVideoId(url) {
  if (!url) return null

  // Handle YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortsMatch) {
    return shortsMatch[1]
  }

  // Handle standard watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return watchMatch[1]
  }

  // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
  if (embedMatch) {
    return embedMatch[1]
  }

  // Handle youtu.be short URLs: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return shortMatch[1]
  }

  return null
}

// Generate YouTube embed URL from video ID
export function getEmbedUrl(videoId) {
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}`
}

// Generate YouTube thumbnail URL
export function getThumbnailUrl(videoId, quality = 'hqdefault') {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}
