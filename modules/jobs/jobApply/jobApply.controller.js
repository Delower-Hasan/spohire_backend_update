const Job = require("../job/job.model");
const JobApply = require("./jobApply.model");

const createJobApply = async (req, res) => {
  try {
    const isExist = await Job.findById({ _id: req.body.job });

    const pdf = req.file.buffer;
    if (pdf) {
      req.body["cv"] = req.file.buffer;
      req.body["contentType"] = req.file.mimetype;
    }

    if (isExist) {
      const newJobApply = new JobApply(req.body);
      const result = await newJobApply.save();
      res.status(200).json({
        success: true,
        message: "Job Apply Create Success",
        data: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Job Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Apply Create Failed",
      error_message: error.message,
    });
  }
};

const getJobsApply = async (req, res) => {
  try {
    const result = await JobApply.find({}).sort({ _id: -1 }).populate("job");
    res.status(200).json({
      success: true,
      message: "Jobs Apply Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Jobs Apply Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getJobApplyById = async (req, res) => {
  try {
    const result = await JobApply.findById({ _id: req.params.id }).populate(
      "job"
    );
    res.status(200).json({
      success: true,
      message: "Job Apply Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Apply Retrieve Failed",
      error_message: error.message,
    });
  }
};

const UpdateJobApplyById = async (req, res) => {
  try {
    const result = await JobApply.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Job Apply Update Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Apply Update Failed",
      error_message: error.message,
    });
  }
};

const DeleteJobApplyById = async (req, res) => {
  try {
    const result = await JobApply.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Job Apply Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Apply Delete Failed",
      error_message: error.message,
    });
  }
};

const getAppliedJobsByCreator = async (req, res) => {
  try {
    const appliedJobs = await JobApply.find({ creator: req.user._id });
    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed",
      error_message: error.message,
    });
  }
};

const getPdfView = async (req, res) => {
  const pdf = await JobApply.findById(req.params.id);

  try {
    const pdf = await JobApply.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.setHeader("Content-Type", pdf.contentType);
    res.send(pdf?.cv);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await JobApply.find({
      userInfo: req.user?._id,
    }).populate("job");
    res.status(200).send(appliedJobs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createJobApply,
  getJobsApply,
  getJobApplyById,
  UpdateJobApplyById,
  DeleteJobApplyById,
  getAppliedJobsByCreator,
  getPdfView,
  getMyAppliedJobs,
};
