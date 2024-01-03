const Job = require("../job/job.model");
const JobApply = require("./jobApply.model");

const createJobApply = async (req, res) => {
  try {
    const isExist = await Job.findById({ _id: req.body.job });

    const pdf = req.file.buffer;
    if (pdf) {
      req.body["cv"] = req.file.buffer;
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
      return res.status(201).json({
        success: false,
        message: "Job Not Found",
      });
    }
  } catch (error) {
    res.status(201).json({
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
    res.status(201).json({
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
    res.status(201).json({
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
    res.status(201).json({
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
    res.status(201).json({
      success: false,
      message: "Job Apply Delete Failed",
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
};
