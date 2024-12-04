import React, { useState } from 'react';
import { createTemplate } from '../api';

const TemplateEditor = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      await createTemplate({ name, content, type: 'user' });
      console.log('Template created successfully');
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <div className="template-editor">
      <input
        type="text"
        placeholder="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Template Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default TemplateEditor;
