function RenderPost({ post }) {
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
}

export default RenderPost;
