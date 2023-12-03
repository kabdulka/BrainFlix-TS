import Comment from '../Comment/Comment';
import '../CommentList/CommentList.scss';
import { VideoType } from '../../modules/types';

interface CommentListProps {
    currentVideo: VideoType
    handleCommentUpdate: () => void
}

const CommentList = ({currentVideo, handleCommentUpdate}: CommentListProps) => {

    const comments = currentVideo.comments.sort((a,b) => b.timestamp - a.timestamp);

    return ( 
        <>
        <section className='comments'>

            <ul className='comments__list'>

                {comments?.map((comment) => 

                    <Comment  
                           key={comment.id} 
                           currentComment={comment} 
                           handleCommentUpdate={handleCommentUpdate}
                           videoId={currentVideo.id}
                    />
                )}
            </ul>
        </section>
        </>
    );
}
 
export default CommentList;