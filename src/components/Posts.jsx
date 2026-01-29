import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostApi";
import "../App.css";
import From from "./From";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});


  const getPostsData = async () => {
    const response = await getPosts();
    console.log(response.data);
    setData(response.data);
  };

  const hendleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const filteredPosts = data.filter((post) => {
          return post.id !== id;
        });
        setData(filteredPosts);
      } else {
        console.log("Failed to delete the post");
      }
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const hendleUpdatePost = (post) => {
    setUpdateDataApi(post);
  }

  return (
    <>
    <section className="section-from">
      <From data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
    </section>
      <section className="sectiom-post">
        <ol>
          {data.map((alldata) => {
            const { id, title, body } = alldata;
            return (
              <li key={id}>
                <p>
                  <span>Title :</span> {title}
                </p>
                <p>
                  <span>Description :</span> {body}
                </p>
                <button onClick={()=>hendleUpdatePost(alldata)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => hendleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
