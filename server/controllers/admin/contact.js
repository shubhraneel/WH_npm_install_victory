const Contact = require("../../models/contact");

const getContacts = async (req, res) => {
    console.log("getContacts ENDPOINT");
    try {
        const contacts = await Contact.find({}).populate("image");
        return res.json({
            status: "success",
            message: "All contacts queried!",
            data: contacts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const addContact = async (req, res) => {
    console.log("addContact ENDPOINT => ", req.body);
    try {
        const contact = new Contact(req.body);
        await contact.save();
        return res.json({
            status: "success",
            message: "Contact added!",
            data: contact,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateContactById = async (req, res) => {
    console.log("updateContactById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const contact = await Contact.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Contact updated!",
            data: contact,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteContactById = async (req, res) => {
    console.log("deleteContactById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Contact.findByIdAndDelete(_id);
        return res.json({
            status: "success",
            message: "Deleted Successfully!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports = {
    getContacts,
    addContact,
    updateContactById,
    deleteContactById,
};
