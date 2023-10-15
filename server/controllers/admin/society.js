const Society = require("../../models/society");
const Image = require("../../models/image");
const BillReimbursementForm = require("../../models/bill_reimbursement_form");
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

const getSocieties = async (req, res) => {
  console.log("getSocieties ENDPOINT");
  try {
    const societies = await Society.find({});
    return res.json({
      status: "success",
      message: "All societies queried!",
      data: societies,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getSocietyById = async (req, res) => {
  console.log("getSocietyById ENDPOINT");
  try {
    const society = await Society.findById(req.params._id)
      .populate("gallery events billReimbursements")
      .populate({
        path: "contacts",
        populate: { path: "profilePic" },
      });
    return res.json({
      status: "success",
      message: "All societies queried!",
      data: society,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const addSociety = async (req, res) => {
  console.log("addSociety ENDPOINT => ", req.body);
  try {
    const ALGOLIA_INDEX_NAME = "society";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const society = new Society(req.body.society);
    await society.save();

    const saveToAlgolia = {
      objectID: society._id.valueOf(),
      name: society.name,
      coverImage: society.coverImage,
      category: society.category,
    };

    await index.saveObject(saveToAlgolia);

    return res.json({
      status: "success",
      message: "Society added!",
      data: society,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateSocietyById = async (req, res) => {
  console.log("updateSocietyById ENDPOINT => ", req.params, req.body);
  const _id = req.params._id;
  try {
    const ALGOLIA_INDEX_NAME = "society";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const society = await Society.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    const saveToAlgolia = {
      objectID: society._id.valueOf(),
      name: society.name,
      coverImage: society.coverImage,
      category: society.category,
    };

    await index.partialUpdateObject(saveToAlgolia);

    return res.json({
      status: "success",
      message: "Society updated!",
      data: society,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteSocietyById = async (req, res) => {
  console.log("deleteSocietyById ENDPOINT => ", req.params, req.body);
  const _id = req.params._id;
  try {
    const ALGOLIA_INDEX_NAME = "society";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    await Society.findByIdAndDelete(_id);

    await index.deleteObject(_id.valueOf());

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

const changeSocietyDescription = async (req, res) => {
  try {
    const societyId = req.user.roleMetadata.society;
    const society = await Society.findByIdAndUpdate(societyId, {
      description: req.body.description,
    });

    return res.json({
      status: "success",
      message: "Society updated!",
      data: society,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const addSocietyGallery = async (req, res) => {
  try {
    const { urls } = req.body;

    const data = [];
    await Promise.all(
      urls.map(async (url) => {
        const obj = new Image({
          imageURL: url,
          uploadedBy: req.user._id,
        });
        const response = await obj.save();
        data.push(response._id);
      })
    );

    await Society.updateOne(
      { _id: req.user.roleMetadata.society },
      { $push: { gallery: { $each: data } } }
    );

    return res.json({
      status: "success",
      message: "Images added!",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const addBillReimbursementForm = async (req, res) => {
  try {
    const { data } = req.body;
    data.status = "In Process";
    data.createdBy = req.user._id;
    data.society = req.user.roleMetadata.society;

    const billReimbursement = new BillReimbursementForm(data);
    const response = await billReimbursement.save();

    await Society.updateOne(
      { _id: req.user.roleMetadata.society },
      { $push: { billReimbursements: response._id } }
    );

    return res.status(200).json({
      status: "success",
      message: "Bill added!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getAllBillReimbursements = async (req, res) => {
  try {
    const billReimbursement = await BillReimbursementForm.find({}).populate(
      "society"
    );
    return res.status(200).json({
      status: "Success",
      data: billReimbursement,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateBillData = async (req, res) => {
  try {
    const billId = req.params._id;
    const bill = await BillReimbursementForm.findByIdAndUpdate(billId, {
      ...req.body,
    });
    return res.status(200).json({
      status: "Success",
      data: bill,
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
  getSocieties,
  getSocietyById,
  addSociety,
  updateSocietyById,
  deleteSocietyById,
  changeSocietyDescription,
  addSocietyGallery,
  addBillReimbursementForm,
  getAllBillReimbursements,
  updateBillData,
};
