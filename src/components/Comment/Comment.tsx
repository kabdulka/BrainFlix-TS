import "../Comment/Comment.scss";
import { getFormattedDate } from "../../util/helpers";
import { CommentType } from "../../modules/types";
import { ApiService } from "../../api/ApiService";

interface CommentProps {
  currentComment: CommentType;
  handleCommentUpdate: () => void;
  videoId: string;
}

const Comment: React.FC<CommentProps> = ({
  currentComment,
  handleCommentUpdate,
  videoId,
}) => {
  const apiService = new ApiService();

  const handleClick = async () => {
    try {
      await apiService.deleteComment(videoId, currentComment.id);
      handleCommentUpdate();
    } catch (e) {
      console.log("Comment video error");
    }
  };

  return (
    <>
      <li className="comment__item">
        <div className="comment__image-container comment__image-container__form"></div>
        <div className="comment__info">
          <div className="comment__info__row-1">
            <p className="comment__name"> {currentComment.name} </p>
            <p className="comment__date">
              {" "}
              {getFormattedDate(currentComment.timestamp)}{" "}
            </p>
          </div>
          <div className="comment__info__row-2">
            <p className="comment__value">{currentComment.comment}</p>
            <a onClick={handleClick} className="comment__delete">
              {" "}
              DELETE{" "}
            </a>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
