import React, { useEffect, useState } from 'react';
import { fetchTemplates } from '../api';
import TemplateCard from './TemplateCard';


const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates()
      .then(({ data }) => setTemplates(data))
      .catch((error) => console.error('Error fetching templates:', error));
  }, []);

  return (
    <div className="template-list">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  );
};

export default TemplateList;
