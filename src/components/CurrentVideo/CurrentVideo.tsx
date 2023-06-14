

import "./CurrentVideo.scss";
import {VideoType} from "../../modules/types"


interface CurrentVideoProp {
    
    currentVideo: VideoType
}

const CurrentVideo = ({currentVideo} : CurrentVideoProp) => {
    return ( 
        <>
            <section className="selected-Video"> 
                <video 
                    className="selected-video__current-video" 
                    poster={currentVideo.image} 
                    src={`${currentVideo.video}/?api_key=kenan`}
                    controls 
                > 
                </video>
            </section>
        </>
     );
}
 
export default CurrentVideo;