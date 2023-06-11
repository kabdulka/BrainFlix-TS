import '../Comment/Comment.scss';
import { getFormattedDate } from '../../App';
import { CommentType } from '../../modules/types';

interface CommentProps {
    currentComment: CommentType
    deleteComment: (commentId: string) => void
}

const Comment = ({currentComment, deleteComment}: CommentProps) => {

    const handleClick = (): void => {

        deleteComment(currentComment.id)
    }

    return ( 
        <>
            <li className="comment__item">
                <div className="comment__image-container comment__image-container__form">
                </div>
                <div className="comment__info">
                    <div className="comment__info__row-1">
                        <p className="comment__name"> {currentComment.name} </p>
                        <p className="comment__date"> {getFormattedDate(currentComment.timestamp)} </p>
                    </div>
                    <div className="comment__info__row-2">
                        <p className="comment__value"> 
                            {currentComment.comment}
                        </p>
                        <a onClick={(handleClick)} className="comment__delete"> DELETE </a>

                    </div>

     
                </div>
            </li> 
        </>

     );
}
 
export default Comment;
