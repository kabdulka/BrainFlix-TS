import "./Video.scss";
import "../VideoList/VideoList";
import { Link } from "react-router-dom";
import { VideosDataType } from "../../modules/types";

interface VideoProp {
  video: VideosDataType;
}

function Video({ video }: VideoProp) {
  return (
    <>
      <li className="videos__item">
        <Link className="videos__link" to={`/${video.id}`}>
          <div className="videos__image-container">
            <img
              className="videos__image"
              src={video.image}
              alt={video.title}
            />
          </div>
          <div className="videos__content">
            <h3 className="videos__content-title"> {video.title} </h3>
            <p className="videos__content-channel"> {video.channel} </p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default Video;
