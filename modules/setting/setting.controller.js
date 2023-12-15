const Observation = require("./observation.model");
const Setting = require("./setting.model");

const getSettingById = async (req, res) => {
  try {
    const result = await Setting.findOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
      message: "Setting Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Setting Retrieve Failed",
      error_message: error.message,
    });
  }
};

const updateSettingById = async (req, res) => {
  try {
    const result = await Setting.findByIdAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Setting Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Setting Update Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  getSettingById,
  updateSettingById,
};
