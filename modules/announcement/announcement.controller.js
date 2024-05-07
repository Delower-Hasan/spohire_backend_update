const { sendNotificationMail } = require("../../utils/sendEmailHelpers");
const {
  getUpdateNotificationsEmails,
  getNewNotificationsEmails,
} = require("../setting/setting.utiles");
const Announcement = require("./announcement.model");

const createAnnouncement = async (req, res) => {
  try {
    if (req.file) {
      req.body["image"] = req.file.path;
    }
    const newAnnouncement = new Announcement(req.body);
    const result = await newAnnouncement.save();
    res.status(200).json({
      success: true,
      message: "Announcement Create Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Create Failed",
      error_message: error.message,
    });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const result = await Announcement.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "Announcements Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcements Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const result = await Announcement.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Announcement Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Retrieve Failed",
      error_message: error.message,
    });
  }
};

const UpdateAnnouncementById = async (req, res) => {
  try {
    if (req.file) {
      req.body["image"] = req.file.path;
    }
    const result = await Announcement.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    // const data = await getUpdateNotificationsEmails();
    // await sendNotificationMail(data);
    res.status(200).json({
      success: true,
      message: "Announcement Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Update Failed",
      error_message: error.message,
    });
  }
};

const DeleteAnnouncementById = async (req, res) => {
  try {
    const result = await Announcement.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Announcement Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  UpdateAnnouncementById,
  DeleteAnnouncementById,
};
