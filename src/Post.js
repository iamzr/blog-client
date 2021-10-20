import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import he from "he";

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
          <NewCommentForm />
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
  };

  const NewCommentForm = () => {
    const [comment, setComment] = useState({
      name: "",
      email: "",
      post: postid,
      content: "",
      anon: false,
    });

    const submit = (e) => {
      e.preventDefault();
      fetch("http://localhost:4000/" + postid + "/comments", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ comment }),
        // headers: {
        // "Content-Type": "application/json",
        // },
      })
        .then((res) => {
          console.log("sent");
          res.json();
        })
        .then((json) => {
          console.log(json);
        })
        .catch((err) => console.log(err));
    };

    return (
      <Form onSubmit={submit}>
        <h5>Add a comment!</h5>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            minLength={2}
            maxLength={180}
            placeholder="Enter your name"
            required
            name="comment[name]"
            value={comment.name}
            onChange={(e) => setComment({ ...comment, name: e.target.value })}
          />
          {comments.errors && comments.errors.name && (
            <p>{comments.errors.name}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            name="comment[email]"
            id="name"
            type="email"
            required
            placeholder="Enter Email"
            value={comment.email}
            onChange={(e) => setComment({ ...comment, email: e.target.value })}
          />
          {comments.errors && comment.errors.email && (
            <p>{comment.errors.email}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="content">Your comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment[content]"
            value={comment.content}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
          />
          {comments.errors && comment.errors.content && (
            <p>{comment.errors.content}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Post anonymously"
            value={comment.anon}
            name="comment[anon]"
            onChange={(e) => setComment({ ...comment, anon: e.target.value })}
          ></Form.Check>
          {comments.errors && comment.errors.anon && (
            <p>{comment.errors.anon}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
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
