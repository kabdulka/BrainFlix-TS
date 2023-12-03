import Video from "../Video/Video";
import { VideosDataType } from "../../modules/types";
import "../VideoList/VideoList.scss";

interface VideoListProp {
  videos: VideosDataType[];
}

const VideoList: React.FC<VideoListProp> = ({ videos }) => {
  return (
    <>
      <aside className="videos">
        <h2 className="videos__title"> Next Videos </h2>
        <ul className="videos__list">
          {videos.map((video) => (
            <Video key={video.id} video={video} />
          ))}
        </ul>
      </aside>
    </>
  );
};

export default VideoList;
