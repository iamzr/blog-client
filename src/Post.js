import React, { useEffect, useState } from "react";

import("./styles.css");

function Post({ match }) {
  const postid = match.params.postid;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const path = "posts/" + postid;
    const url = "http://localhost:4000/" + path;

    fetch(url, {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPost(json.post);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:4000/posts/" + postid + "/comments", {
      mode: "cors",
    })
      .then((response) => {
        console.log("gotten the comments" + url);
        return response.json();
      })
      .then((json) => {
        setComments(json.comment_list);
        console.log(json.comment_list);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [postid]);

  const RenderPost = () => {
    return (
      <div>
        <div className="title-container">
          <h2 className="text-center">{post.title}</h2>
          <div className="text-center">
            Date Created: {new Date(post.date_created).toLocaleDateString()}
          </div>
        </div>
        <div className="contents">{post.contents}</div>
      </div>
    );
  };

  const RenderComments = () => {
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
          <ul className="comments-list">
            {comments.map((comment) => {
              console.log("This has happened");
              return (
                <li className="comment" key={comment._id}>
                  <div>{comment.content}</div>
                  <div>{comment.user}</div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  if (!post || !comments) {
    return <div></div>;
  } else {
    return (
      <div className="post-container">
        <RenderPost />
        <RenderComments />
      </div>
    );
  }
}

export default Post;
