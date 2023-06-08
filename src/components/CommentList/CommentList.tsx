import Comment from '../Comment/Comment';
import '../CommentList/CommentList.scss';
import { VideoType } from '../../modules/types';

interface CommentListProps {
    currentVideo: VideoType
    deleteComment: (commentId: string) => void
}

const CommentList = ({currentVideo, deleteComment}: CommentListProps) => {

    const comments = currentVideo.comments;
    // const videoId = currentVideo.id;

    return ( 
        <>
     
        <section className='comments'>

            <ul className='comments__list'>

                {comments?.map((comment) => 
 
                    // Map returns new data use it instead of a for each loop
                    <Comment  
                           key={comment.id} currentComment={comment} deleteComment={deleteComment}/>
                
                           )}
            </ul>

        </section>

        </>
    );
}
 
export default CommentList;