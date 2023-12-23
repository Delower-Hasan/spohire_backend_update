const User = require("../user/user.model");
const Payment = require("./payment.model");

const createPayment = async (req, res) => {
  try {
    const isExist = await User.findById({ _id: req.body.userId });
    if (isExist) {
      const newPayment = new Payment(req.body);
      const result = await newPayment.save();
      res.status(200).json({
        success: true,
        message: "Payment Create Success",
        data: result,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Payment Creation Failed",
      error_message: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const result = await Payment.find({}).sort({ _id: -1 }).populate("userId");
    res.status(200).json({
      success: true,
      message: "Payment Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Payment Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getUserPayments = async (req, res) => {
  try {
    const result = await Payment.find({ userId: req.params.id });
    res.status(200).json({
      success: true,
      message: "Payment Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Payment Retrieve Failed",
      error_message: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const result = await Payment.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Payment Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Payment Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getUserPayments,
  deletePayment,
};
