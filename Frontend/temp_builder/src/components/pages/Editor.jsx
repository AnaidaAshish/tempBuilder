import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("user");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/templates/${id}`)
        .then((response) => {
          const { name, content } = response.data;
          setName(name);
          setContent(content);
          setType(type);
        })
        .catch((error) => {
          console.error("Error fetching template:", error);
          alert(
            "Failed to fetch template. Check the API endpoint and try again."
          );
        });
    }
  }, [id]);

  const handleSave = async () => {
    const payload = { name, content, type };

    try {
      if (id) {
        await axios.put(
          `http://localhost:8000/api/templates/update-temp/${id}`,
          payload
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/templates/create-temp",
          payload
        );
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <div className="template-editor">
      <button className="btn"  onClick={() => navigate("/")}>Home</button>
      <h1>{id ? "Edit Template" : "Create Template"}</h1>
      <input
        type="text"
        placeholder="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Template Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        cols="50"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="library">Library</option>
        <option value="user">User</option>
      </select>
      <br />
      <div>
        <button style={{ margin: "10px" }} onClick={handleSave}>
          Save
        </button>
        
      </div>
    </div>
  );
};

export default Editor;
