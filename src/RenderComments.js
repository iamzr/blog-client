import he from "he";
import NewCommentForm from "./NewCommentForm";

function RenderComments({ comments, postid }) {
  if (!Array.isArray(comments) || !comments.length) {
    return (
      <div className="comments-container">
        <h3>Comments</h3>
        <div>No comments yet</div>
      </div>
    );
  } else {
    return (
      <div className="comments-container">
        <h3>Comments</h3>
        <NewCommentForm postid={postid} comments={comments} />
        <ul className="comments-list">
          {comments.map((comment) => {
            console.log("This has happened");
            return (
              <li className="comment" key={comment._id}>
                <div>{he.decode(comment.content)}</div>
                <small> - {comment.user}</small>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RenderComments;
