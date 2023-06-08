

import "./CurrentVideo.scss";
import {VideoType} from "../../modules/types"


interface CurrentVideoProp {
    currentVideo: VideoType
}

const CurrentVideo = ({currentVideo} : {currentVideo:VideoType}) => {
    console.log("current video ", currentVideo.image);
    return ( 
        <>
            <section className="selected-Video"> 
                <video className="selected-video__current-video" poster={currentVideo.image}  controls> 
                    <source src={currentVideo.video} /> 
                </video>
            </section>
        </>
     );
}
 
export default CurrentVideo;