import './CommentsForm.scss';
import avatar from '../../assets/Images/Mohan-muruge.jpg';
import { useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { VideoType } from '../../modules/types';
import { ApiService } from '../../api/ApiService';

interface newComment {
    comment: string
}

interface CommentFormProps {
    currentVideo: VideoType
    handleCommentUpdate: () => void
}

const apiService = new ApiService();

const CommentsForm = ({ currentVideo, handleCommentUpdate}: CommentFormProps) => {

    const [newComment, setNewComment] = useState<string>("")
    const [textFieldError, setTextFieldError] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        if (newComment.length === 0) {
            setTextFieldError("--error");
            return;
        } else {
            setTextFieldError("");
            const newCommentObj: newComment = {
                comment: newComment
            };

            try {
                await apiService.postComment(currentVideo.id, newCommentObj);
                setNewComment('');
                handleCommentUpdate();
              } catch (error) {
                console.error('Error posting comment:', error);
              }
        }
    };

    useEffect(() => {
        setTextFieldError("");
    }, [currentVideo])

    const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setNewComment(event.target.value);
    };

    return ( 
        <>
            <section className="form">

                <div className="form__container">

                    <div className="form__wrapper">

                        <div className="comment__image-container">
                            <img className="comment__image comment__image--form" src={avatar} alt="Mohan-muruge" />
                        </div>

                        <form className="form__comment" onSubmit={handleSubmit}>
                            <div className="form__info-container">
                                <label className="form__comment-label form__comment-text--label" htmlFor="comment"> JOIN THE CONVERSATION </label>
                                <textarea  value={newComment} onChange={handleCommentChange} className={`form__comment-text form__comment-text${textFieldError}`} id="comment" name="comment" placeholder="Add a new comment" ></textarea>
                            </div>
                            <div className="form__comment__btn-container">
                                <button  type="submit" className="form__comment-btn"> COMMENT </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
     );
}
 
export default CommentsForm;
