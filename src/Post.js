import React, { useEffect, useState } from "react";

import RenderPost from "./RenderPost";
import RenderComments from "./RenderComments";

import("./styles.css");

function Post({ match }) {
  const postid = match.params.postid;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const path = "posts/" + postid;
    const url = process.env.REACT_APP_API_URL + path;

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

    fetch(process.env.REACT_APP_API_URL + "posts/" + postid + "/comments", {
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

  if (!post || !comments) {
    return <div class="loader"></div>;
  } else {
    return (
      <div className="post-container">
        <RenderPost post={post} />
        <RenderComments comments={comments} postid={postid} />
      </div>
    );
  }
}

export default Post;
