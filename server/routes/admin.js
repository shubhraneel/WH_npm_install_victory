const express = require("express");

const router = express.Router();

const { requireSignin, restrictTo } = require("../middlewares");

// Auth
const {
  createOfficial,
  loginOfficial,
  loginOfficialFromJWT,
} = require("../controllers/admin/auth");

router.post("/admin/create-official", createOfficial);
router.post("/admin/login", loginOfficial);
router.post("/admin/login-with-token", loginOfficialFromJWT);

// Event
const { createSocietyEvent } = require("../controllers/admin/event");

router.post(
  "/admin/event/create",
  requireSignin,
  restrictTo("societyOfficial"),
  createSocietyEvent
);

// Student
const {
  getUsers,
  updateUserById,
  addUser,
  addUsers,
  deleteUserById,
  getUserById,
  getUserByRollNo,
} = require("../controllers/admin/student");

router.get(
  "/admin/users",
  requireSignin,
  restrictTo("admin", "tsgOfficials"),
  getUsers
);
router.get(
  "/admin/user/:_id",
  requireSignin,
  restrictTo("admin", "tsgOfficials"),
  getUserById
);
router.get(
  "/admin/student/:rollNo",
  requireSignin,
  restrictTo("admin", "tsgOfficials", "societyOfficial"),
  getUserByRollNo
);
router.post("/admin/add-user", requireSignin, restrictTo("admin"), addUser);
router.post("/admin/add-users", requireSignin, restrictTo("admin"), addUsers);
router.put(
  "/admin/update-user/:_id",
  requireSignin,
  restrictTo("admin"),
  updateUserById
);
router.delete(
  "/admin/delete-user/:_id",
  requireSignin,
  restrictTo("admin"),
  deleteUserById
);

// Society
const {
  getSocieties,
  addSociety,
  updateSocietyById,
  deleteSocietyById,
  getSocietyById,
  changeSocietyDescription,
  addSocietyGallery,
  addBillReimbursementForm,
  getAllBillReimbursements,
  updateBillData,
} = require("../controllers/admin/society");

router.get("/admin/societies", getSocieties);
router.get("/admin/society/:_id", getSocietyById);
router.post("/admin/add-society", addSociety);
router.put("/admin/update-society/:_id", updateSocietyById);
router.delete("/admin/delete-society/:_id", deleteSocietyById);
router.post(
  "/admin/society/change-description",
  requireSignin,
  restrictTo("societyOfficial"),
  changeSocietyDescription
);
router.post(
  "/admin/society/add-image",
  requireSignin,
  restrictTo("societyOfficial"),
  addSocietyGallery
);
router.post(
  "/admin/society/add-bill-reimbursement",
  requireSignin,
  restrictTo("societyOfficial"),
  addBillReimbursementForm
);
router.get(
  "/admin/bill-reimbursements",
  requireSignin,
  restrictTo("admin"),
  getAllBillReimbursements
);
router.post(
  "/admin/bill-reimbursement/:_id",
  requireSignin,
  restrictTo("admin"),
  updateBillData
);

// Resources
const {
  getResources,
  addResource,
  updateResourceById,
  deleteResourceById,
} = require("../controllers/admin/resource");

router.get("/admin/resources", getResources);
router.post("/admin/add-resource", addResource);
router.put("/admin/update-resource/:_id", updateResourceById);
router.delete("/admin/delete-resource/:_id", deleteResourceById);

// Quick Links
const {
  getQuickLinks,
  addQuickLink,
  updateQuickLinkById,
  deleteQuickLinkById,
} = require("../controllers/admin/quickLinks");

router.get("/admin/quicklinks", getQuickLinks);
router.post("/admin/add-quicklink", addQuickLink);
router.put("/admin/update-quicklink/:_id", updateQuickLinkById);
router.delete("/admin/delete-quicklink/:_id", deleteQuickLinkById);

// Hall
const {
  getHalls,
  addHall,
  updateHallById,
  deleteHallById,
  getHallById,
} = require("../controllers/admin/hall");

router.get("/admin/halls", getHalls);
router.get("/admin/hall/:_id", getHallById);
router.post("/admin/add-hall", addHall);
router.put("/admin/update-hall/:_id", updateHallById);
router.delete("/admin/delete-hall/:_id", deleteHallById);

// Contact
const {
  getContacts,
  addContact,
  updateContactById,
  deleteContactById,
} = require("../controllers/admin/contact");

router.get("/admin/contacts", getContacts);
router.post("/admin/add-contact", addContact);
router.put("/admin/update-contact/:_id", updateContactById);
router.delete("/admin/delete-contact/:_id", deleteContactById);

// Image
const {
  getImages,
  addImage,
  updateImageById,
  deleteImageById,
} = require("../controllers/admin/image");

router.get("/admin/images", getImages);
router.post("/admin/add-image", addImage);
router.put("/admin/update-image/:_id", updateImageById);
router.delete("/admin/delete-image/:_id", deleteImageById);

// Department
const {
  getDepartments,
  addDepartment,
  updateDepartmentById,
  deleteDepartmentById,
} = require("../controllers/admin/department");

router.get("/admin/departments", getDepartments);
router.post("/admin/add-department", addDepartment);
router.put("/admin/update-department/:_id", updateDepartmentById);
router.delete("/admin/delete-department/:_id", deleteDepartmentById);

// Facult
const {
  getFaculties,
  addFaculty,
  updateFacultyById,
  deleteFacultyById,
} = require("../controllers/admin/faculty");

router.get("/admin/faculties", getFaculties);
router.post("/admin/add-faculty", addFaculty);
router.put("/admin/update-faculty/:_id", updateFacultyById);
router.delete("/admin/delete-faculty/:_id", deleteFacultyById);

module.exports = router;
