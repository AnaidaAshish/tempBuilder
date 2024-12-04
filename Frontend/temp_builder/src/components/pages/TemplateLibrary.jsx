import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Styles.css";

const TemplateLibrary = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/templates/get-templates')
      .then((response) => {
        console.log(response.data);  
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setTemplates(response.data.data);
        } else {
          console.error("Expected an array of templates in response.data.data");
        }
      })
      .catch((error) => console.error('Error fetching templates:', error));
  }, []);
  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <h1>Template Library</h1>
      <ul>
        {templates.map((template) => (
          <li key={template._id}>
            <h2>{template.name}</h2>
            <p>{template.content}</p>
            <p>{template.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateLibrary;
