import { extractVideoId, getEmbedUrl, getThumbnailUrl } from '../utils/youtube'

// Real YouTube videos for the Watch & Learn section
const videoLinks = [
  {
    urlOriginal: 'https://www.youtube.com/shorts/80ZRWFIEir4',
    title: 'Quick Recovery Stretches',
    sportTag: 'Stretching',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/gmEcStaqeLU',
    title: 'Post-Workout Recovery Tips',
    sportTag: 'General',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/qDvG7CenPyo',
    title: 'Hydration for Athletes',
    sportTag: 'Nutrition',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/u7xyI7N-Drk',
    title: 'Recovery Nutrition Basics',
    sportTag: 'Nutrition',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/FDEQLhkPV0g',
    title: 'Stretching Routine',
    sportTag: 'Stretching',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/ociwDaAp5Oc',
    title: 'Cool-Down Exercises',
    sportTag: 'Stretching',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/Bnc3u5rFPhs',
    title: 'Recovery Habits',
    sportTag: 'General',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/3Jap77oFcGw',
    title: 'Athlete Recovery Tips',
    sportTag: 'General',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/shorts/GMReVUogVlc',
    title: 'Building Recovery Routines',
    sportTag: 'General',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/watch?v=qyrLAHE3PSo',
    title: 'Sports Recovery Guide',
    sportTag: 'General',
    points: 20,
  },
  {
    urlOriginal: 'https://www.youtube.com/watch?v=cJ16BdzZ844&pp=ygUjc3BvcnRzIG51dHJpdGlvbiBmb3IgeW91bmcgYXRobGV0ZXM%3D',
    title: 'Sports Nutrition for Young Athletes',
    sportTag: 'Nutrition',
    points: 20,
  },
]

// Process videos to extract IDs and generate URLs
const processedVideos = videoLinks.map((video, index) => {
  const videoId = extractVideoId(video.urlOriginal)
  if (!videoId) {
    console.warn(`Could not extract video ID from: ${video.urlOriginal}`)
  }

  return {
    id: `video-${index + 1}`,
    title: video.title,
    urlOriginal: video.urlOriginal,
    videoId: videoId,
    embedUrl: videoId ? getEmbedUrl(videoId) : null,
    thumbnailUrl: videoId ? getThumbnailUrl(videoId) : null,
    sportTag: video.sportTag,
    points: video.points,
  }
}).filter(video => video.videoId) // Remove any videos without valid IDs

// Organize videos by category for filtering
export const videos = {
  all: processedVideos,
  general: processedVideos.filter(v => v.sportTag === 'General'),
  stretching: processedVideos.filter(v => v.sportTag === 'Stretching'),
  nutrition: processedVideos.filter(v => v.sportTag === 'Nutrition'),
}

// Export all videos as a flat array for easy access
export const allVideos = processedVideos
