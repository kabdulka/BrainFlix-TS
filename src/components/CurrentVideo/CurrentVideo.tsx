import "./CurrentVideo.scss";
import { VideoType } from "../../modules/types";
import React from "react";

interface CurrentVideoProp {
  currentVideo: VideoType;
}

const CurrentVideo: React.FC<CurrentVideoProp> = ({ currentVideo }) => {
  return (
    <>
      <section className="selected-Video">
        <video
          className="selected-video__current-video"
          poster={currentVideo?.image}
          src={`${currentVideo?.video}/?api_key=kenan`}
          controls
        ></video>
      </section>
    </>
  );
};

export default CurrentVideo;
