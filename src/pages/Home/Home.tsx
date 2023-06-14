
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CurrentVideo from "../../components/CurrentVideo/CurrentVideo";
import VideoList from '../../components/VideoList/VideoList'
import MainContent from "../../components/MainContent/MainContent";
import CommentList from "../../components/CommentList/CommentList";
import CommentsForm from "../../components/CommentsForm/CommentsForm"
import { newComment } from "../../modules/types";

// environment variables stored in .env, needs to be prefixed with REACT_APP_ in React apps
// const API_URL = process.env.VITE_REACT_APP_API_URL || "http://localhost:9000";
const API_URL = "http://localhost:5500";
const apiKey = "0040d29c-3835-4c59-81b7-7ce4e654ded5";
interface VideosDataType {

    id: string
    title: string
    channel: string
    image: string
}

interface Comment {
  id: string
  name: string
  comment: string
  likes: number
  timestamp: number
}

interface VideoType {
  id: string
  title: string
  channel: string
  image: string
  description: string
  views: string
  likes: number | string
  duration: string
  video: string
  timestamp: number
  comments: Comment[]
}

const Home = () => {

  let request: string = `videos`
  const videosUrl: string = `${API_URL}/${request}`

  const [videosList, setVideosList] = useState<VideosDataType[]>([]);

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
    comments: [

    ]
  });
   
  const {videoId} = useParams()

  function getRandomVid (vidListLen: number) {
    return Math.floor((Math.random() * vidListLen));
  }

  function getVideos () {

    axios
    .get(videosUrl)
    .then((response) => {
      setVideosList(response.data);

      })
    .then(() => {

      })
    .catch ((err) => {
      console.log(`Videos API error :`, err)
    })


	}// end getVideos function

  // on page mount [] empty dependency runs once. good for API calls
  // fires the side effect of useEffect after every render when there is no second argument
  useEffect(() => {
    getVideos();
    document.title = 'Home';
  }, [])

  function getCurrentVideo(id: string) {
    console.log("id," + id)
      axios
      .get(`${API_URL}/${request}/${id}`)
      .then( (response) => {
        setTimeout(() => {
          
          setCurrentVideo(response.data)
          console.log(response.data)
          document.title = `${response.data.title}}`;
        }, 500);
        })
      .catch ( (err: Error) => {
        console.log(`Videos API error :` , err);
      })
  }
 

  // empy square brackets [] means on page mount (page renders)
  useEffect(() => {

    if (videoId) {
        getCurrentVideo(videoId);
    } else if(videosList.length){
        let ranNum: number = getRandomVid(videosList.length)

        let curVid: string = videosList[ranNum].id;
        getCurrentVideo(curVid)

    }
    // videoId is a dependency which means that the use effect will run the code when the videoId variable has changed
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [videoId, videosList])


  const postComment = (newComment: newComment) => {
    const postCommentUrl = `${API_URL}/${request}/${currentVideo?.id}/comments`
    axios
        .post(postCommentUrl, newComment )
        .then( () => {
            getCurrentVideo(currentVideo?.id);
        })
        .catch((err) => {
            console.log("Comment post error", err);
        });

  }

  const deleteComment = (commentId: string) => {
    
    const deleteCommentUrl = `${API_URL}/${request}/${currentVideo.id}/comments/${commentId}`;
    console.log("inside")
    axios
        .delete(deleteCommentUrl)
        .then(( ) => {
          console.log("here")
            getCurrentVideo(currentVideo?.id)
        })
        .catch( (err) => {
            console.log("delete post error", err);
        });
  }


  const likeVideo = (videoId: string): void => {
   
    const url = `${API_URL}/${request}/${videoId}/likes`;
    axios
    .put(url)
    .then(() => {
      // alert("Video Liked")
      getCurrentVideo(videoId)
    })
    .catch( (err) => {
        console.log("Could not like video", err);

    });
}
	
  

    return ( 
        currentVideo && videosList ? 
        <>
          <CurrentVideo   currentVideo={currentVideo}/>
          <div className="app__contant">
            <div className="main__content">
              <div className="main__content-left">
                
                <MainContent getCurrentVideo={getCurrentVideo} currentVideo={currentVideo} likeVideo={likeVideo}/>
                <CommentsForm currentVideo={currentVideo} postComment={postComment} />
                <CommentList deleteComment={deleteComment} currentVideo={currentVideo}/>
              </div>
              <div className="main__content-right">
                <VideoList videos={videosList.filter(e => e.id !== currentVideo.id)}  />
              </div>
            </div>
          </div>
        </> 
        : null

     );
}
 
export default Home;


