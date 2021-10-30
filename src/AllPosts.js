import { Component } from "react";
import { Card } from "react-bootstrap";
import("./AllPosts.css");

class AllPosts extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      err: "",
    };
  }

  componentDidMount() {
    let header = new Headers();
    console.log(process.env.REACT_APP_API_URL);

    fetch(String(process.env.REACT_APP_API_URL) + "posts", {
      mode: "cors",
      header: header,
    })
      .then((response) => {
        // this.setState({
        //   posts: response.post_list,
        // });
        console.log("gotten the postst");
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          posts: json.post_list,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  redirect(postid) {
    this.props.history.push("/posts/" + postid);
  }

  render() {
    let { posts } = this.state;

    return (
      <div className="post-container">
        {posts.map((post, index) => {
          return (
            <Card
              onClick={() => {
                this.redirect(post._id);
              }}
              href="/posts/"
              key={"post" + post._id}
              className="m-2 post-card"
            >
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle>
                  {new Date(post.date_created).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{post.contents.substr(0, 100) + "..."}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default AllPosts;
