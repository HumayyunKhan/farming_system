const AsyncHandler = require("express-async-handler");
const ContactUsModel = require("../../Models/AdminModel/ContactUsModel");

const postcontactus = AsyncHandler(async (req, res) => {
    const { name, email, subject, message, } = req.body;
    try {
        const existingCategory = await ContactUsModel.findOne({ email });
        if (existingCategory) {
            return res.status(400).json("Category Already Exists");
        }

        await ContactUsModel.create({
            name, email, subject, message,
        });

        res.status(201).json("Successfully Added Category Product");
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json("Error adding category");
    }
});

const getcontactus = AsyncHandler(async (req, res) => {
    const contactus = await ContactUsModel.find();
    res.status(200).json(contactus);
});

const deletecontactus = AsyncHandler(async (req, res) => {
    const queryId = req.params.queryId;
    try {
        const deletedQuery = await ContactUsModel.findOneAndDelete(({ _id: queryId }));
        if (!deletedQuery) {
            return res.status(404).json('Query not found');
        }
        res.status(200).json('Query deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

module.exports = { postcontactus, getcontactus, deletecontactus };
