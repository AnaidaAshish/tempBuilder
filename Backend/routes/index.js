import { Router } from "express";
import {getTemplates,createTemplate,updatedTemplate,deletedTemplate} from "../controllers/templateController.js"
const routes = Router();

routes.get("/get-templates",getTemplates)
routes.post("/create-temp",createTemplate);
routes.put("/update-temp/:id",updatedTemplate);
routes.delete("/delete-temp/:id",deletedTemplate)

export default routes   