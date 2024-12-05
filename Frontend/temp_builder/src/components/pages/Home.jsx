import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Styles.css";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("library");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(
          "https://tempbuilder-backend.onrender.com/api/templates/get-templates"
        );
        setTemplates(response.data.data || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates.filter((template) => {
      const matchesSearch =
        template.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content?.toLowerCase().includes(searchQuery.toLowerCase());

      if (tab === "library") {
        return matchesSearch && template.type === "library";
      } else if (tab === "user") {
        return matchesSearch && template.type === "user";
      }
      return matchesSearch;
    });

    filtered = filtered.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdDate) - new Date(b.createdDate)
        : new Date(b.createdDate) - new Date(a.createdDate)
    );

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, tab, sortOrder]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tempbuilder-backend.onrender.com/api/templates/delete-temp/${id}`
      );
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <div className="parent">
      <div className="topNav">
        <h1>Templates</h1>
        <div className="createTemp">
          <Link to="/editor">
            <button>Create Template</button>
          </Link>
        </div>
      </div>
      <div className="Homebtns">
        <button
          onClick={() => navigate("/template-library")}
          className={(tab === "library" ? "active" : "", "libAndSave")}
        >
          Template Library
        </button>
        <button
          onClick={() => setTab("user")}
          className={(tab === "user" ? "active" : "", "libAndSave")}
        >
          Saved Templates
        </button>
      </div>
      <div className="seacrhSort">
        <div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="sort-dropdown"
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Recently Added</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="template-list">
        {filteredTemplates.map((template) => (
          <div key={template._id} className="template-card">
            <h3>{template.name}</h3>
            <p>{template.content}</p>
            <p>
              Created: {new Date(template.createdDate).toLocaleDateString()}
            </p>
            <Link to={`/editor/${template._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(template._id)}>Delete</button>
          </div>
        ))}
        {filteredTemplates.length === 0 && (
          <p>No templates found for the selected tab or search query.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
