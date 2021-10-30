import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import AllPosts from "./AllPosts";
import Post from "./Post.js";

import("bootstrap/dist/css/bootstrap.min.css");
import("./styles.css");

function App() {
  return (
    <div className="App">
      <div className="jumbotron text-center">
        <Container>
          <h1 className="jumbotron-heading">
            <a className="blog-name" href="/">
              My Simple Blog
            </a>
          </h1>
        </Container>
        <div>Some stuff a summary of your blog and all that</div>
      </div>

      <Router>
        <Switch>
          <Route path="/" exact component={AllPosts}></Route>
          <Route path="/posts" exact component={AllPosts}></Route>
          <Route path="/posts/:postid" component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
