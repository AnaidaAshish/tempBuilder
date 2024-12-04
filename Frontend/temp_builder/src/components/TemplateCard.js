import React from "react";


const TemplateCard = ({ template }) => (
  <div className="template-card">
    <h3>{template.name}</h3>
    <p>Created: {new Date(template.createdDate).toLocaleDateString()}</p>
  </div>
);

export default TemplateCard;
