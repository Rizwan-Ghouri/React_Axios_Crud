import React, { useEffect } from "react";
import { addPost, updatePost } from "../api/PostApi";

const From = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = React.useState({
    title: "",
    body: "",
  });

  const isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const updateData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curItem) => {
            return curItem.id === updateDataApi.id ? res.data : curItem;
          });
        });
      }
      setAddData({
        title: "",
        body: "",
      });
      setUpdateDataApi({});
    } catch (error) {
      console.log("Error updating post:", error);
    }
  };

  const hendleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await addPost(addData);
    console.log(res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({
        title: "",
        body: "",
      });
    }
  };

  const hendleFromSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updateData();
    }
  };

  return (
    <form onSubmit={hendleFromSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={hendleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={hendleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default From;
