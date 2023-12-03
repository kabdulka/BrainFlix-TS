import '../MainContent/MainContent.scss';
import likesIcon from '../../assets/Icons/likes.svg';
import viewsIcon from '../../assets/Icons/views.svg'
import { getFormattedDate } from '../../util/helpers';
import { VideoType } from '../../modules/types';
import { ApiService } from '../../api/ApiService';

const apiService = new ApiService()

interface MainContentProps {
    currentVideo: VideoType
    handleVideoLike: (videoId: string) => void
}

const MainContent = ({currentVideo, handleVideoLike}: MainContentProps) => {

    const handleLike = async () => {
        try {
            await apiService.likeVideo(currentVideo.id);
            handleVideoLike(currentVideo.id);
            
        } catch (error) {
            console.error('Error liking Video:', error);
        }

    }
 
    return (
        <>
            <main className='current-video'>
                <h2 className="current-video__title">  {currentVideo.title} </h2>
                <div className="current-video__info">

                    <div className="current-video__flex1">
                        <p className="current-video__channel"> by {currentVideo.channel} </p>
                        <p className="current-video__date"> {getFormattedDate(currentVideo.timestamp)} </p>
                    </div>
                
                    <div className="current-video__flex2">
                        <div className="current-video__views-container">
                            <img src={viewsIcon}/>
                            <p className="current-video__views"> {currentVideo.views} </p>
                        </div>
                        <div className="current-video__likes-container">
                            <img onClick={handleLike} className="current-video__likes-icon" src={likesIcon}/>
                            <p className="current-video__likes"> {currentVideo.likes} </p>
                                
                        </div>
                    </div>
                </div>

                <p className="current-video__description"> {currentVideo.description} </p>
                <p className="current-video__comment-number"> {currentVideo.comments?.length} comments </p>
                
            </main>
        </>
    );
}

export default MainContent;