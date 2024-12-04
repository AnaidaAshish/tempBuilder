import axios from 'axios';

const API = axios.create({ baseURL: 'https://tempbuilder-backend.onrender.com/api/templates' });

export const fetchTemplates = () => API.get('/get-templates');
export const createTemplate = (template) => API.post('/create-temp', template);
export const updateTemplate = (id, template) => API.put(`/update-temp/${id}`, template);
export const deleteTemplate = (id) => API.delete(`/delete-temp/${id}`);
