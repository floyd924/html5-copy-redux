import React from "react";
import List from "./List";
import Form from "./Form.jsx";
import Post from "./Post.jsx";

const App = () => (
    <div className="row mt-5">
        <div className="col-md-4 offset-md-1">
            <h2>Articles</h2>
            <List />
        </div>
        <div className="col-md-4 offset-md-1">
            <Form />
        </div>
        <div className="col-md-4 offset-md-1">
            <h2>API posts</h2>
            <Post />
        </div>
    </div>
);
export default App;