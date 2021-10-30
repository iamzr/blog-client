import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function NewCommentForm({ postid, comments }) {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
    anon: false,
  });

  const submit = (e) => {
    e.preventDefault();
    console.log(comment);
    fetch(process.env.REACT_APP_API_URL + "posts/" + postid + "/comments", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
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
    window.location.reload(false);
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
          onChange={(e) => {
            setComment({ ...comment, email: e.target.value });
            console.log(e.target.value);
          }}
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
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
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
          onChange={(e) => {
            setComment({ ...comment, anon: e.target.checked });
            console.log(e.target.checked);
          }}
        ></Form.Check>
        {comments.errors && comment.errors.anon && <p>{comment.errors.anon}</p>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default NewCommentForm;
