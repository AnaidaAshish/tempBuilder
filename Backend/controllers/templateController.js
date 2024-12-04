import Template from "../models/templateModel.js";

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    return res.status(200).json({
      success: true,
      message: "Templates fetched successfully",
      data: templates,
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTemplate = async (req, res) => {
  const { name, content, type } = req.body;

  if (!name || !content || !type) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const template = new Template({
      name,
      content,
      type,
      createdDate: new Date(),
    });
    await template.save();
    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error Creating Template" });
  }
};

export const updatedTemplate = async (req, res) => {
  const { name, content } = req.body;

  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { name, content },
      { new: true }
    );
    if (!updatedTemplate) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Template Updated successfully",
      updatedTemplate,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update the template",
    });
  }
};

export const deletedTemplate = async (req, res) => {
  try {
    const deleteTemplate = await Template.findByIdAndDelete(req.params.id);

    if (!deleteTemplate) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Template deleted successfully",
      deletedTemplate: deleteTemplate,
    });
  } catch (error) {
    console.error("Error deleting template:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete template",
    });
  }
};
