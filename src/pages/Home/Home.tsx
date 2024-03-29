import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CurrentVideo from "../../components/CurrentVideo/CurrentVideo";
import VideoList from "../../components/VideoList/VideoList";
import MainContent from "../../components/MainContent/MainContent";
import CommentList from "../../components/CommentList/CommentList";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useQuery } from "@tanstack/react-query";
import fetchVideos from "../../api/fetchVideos";
import { ApiService } from "../../api/ApiService";

interface Comment {
  id: string;
  name: string;
  comment: string;
  likes: number;
  timestamp: number;
}

interface VideoType {
  id: string;
  title: string;
  channel: string;
  image: string;
  description: string;
  views: string;
  likes: number | string;
  duration: string;
  video: string;
  timestamp: number;
  comments: Comment[];
}


const Home: React.FC = () => {
  
  const request: string = `videos`;
  const apiService = new ApiService();

  const [currentVideo, setCurrentVideo] = useState<VideoType>({
    id: "",
    title: "",
    channel: "",
    image: "",
    description: "",
    views: "",
    likes: "",
    duration: "",
    video: "",
    timestamp: 0,
    comments: [],
  });

  const { videoId } = useParams();

  function getRandomVid(vidListLen: number) {
    return Math.floor(Math.random() * vidListLen);
  }

  const {
    data: videosData,
  } = useQuery(["videos", request], fetchVideos);

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    async function fetchVideo() {
      if (videoId) {
        apiService.getCurrentVideo(videoId);

        const currentVideo = await apiService.getCurrentVideo(videoId);
        document.title = `${currentVideo.title}`;
        setCurrentVideo(currentVideo);
      } else if (!videoId && videosData) {
        let ranNum: number = getRandomVid(videosData.length);
        document.title = `Home`;
        let curVid: string = videosData[ranNum].id;
        const randomVideo = await apiService.getCurrentVideo(curVid);
        setCurrentVideo(randomVideo);
      }

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    fetchVideo();
  }, [videoId, videosData]);

  // Handle adding new comments
  const handleVideoInfoUpdate = async () => {
    try {
      const updatedVideo = await apiService.getCurrentVideo(currentVideo.id);
      setCurrentVideo(updatedVideo);
    } catch (error) {
      console.error("Error fetching updated video:", error);
    }
  };

  return currentVideo && videosData ? (
    <>
      {currentVideo && <CurrentVideo currentVideo={currentVideo} />}
      <div className="app__contant">
        <div className="main__content">
          <div className="main__content-left">
            {currentVideo && (
              <MainContent
                currentVideo={currentVideo}
                handleVideoLike={handleVideoInfoUpdate}
              />
            )}
            <CommentsForm
              currentVideo={currentVideo}
              handleCommentUpdate={handleVideoInfoUpdate}
            />
            <CommentList
              handleCommentUpdate={handleVideoInfoUpdate}
              currentVideo={currentVideo}
            />
          </div>
          <div className="main__content-right">
            <VideoList
              videos={
                videosData
                  ? videosData.filter((e) => e.id !== currentVideo.id)
                  : []
              }
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Home;
