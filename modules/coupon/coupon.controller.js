const Coupon = require("./coupon.model");

const addCoupon = async (req, res) => {
  try {
    const { ...info } = req.body;

    let existingCoupon = await Coupon.findOne({
      code: info.code.trim(),
    });

    if (existingCoupon) {
      res.status(200).send({
        message: "This coupon is already used",
        success: false,
      });
    } else {
      const coupon = new Coupon(info);
      await coupon.save();
      res.status(200).send({
        message: "Coupon created Successfully",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCoupons = async (req, res) => {
  try {
    const isExist = await Coupon.find({});
    if (isExist?.length > 0) {
      res.status(200).send({
        data: isExist,
        success: true,
      });
    } else {
      res.status(200).send({
        message: "No coupon code found!",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { ...info } = req.body;
    const coupon = await Coupon.findById(req.params.id);
    let existingCoupon = await Coupon.findOne({
      code: info.code.trim(),
      _id: { $ne: req.params.id },
    });

    if (existingCoupon) {
      return res.status(200).send({
        message: "This coupon is already used",
        success: false,
      });
    }

    if (coupon) {
      await Coupon.findByIdAndUpdate({ _id: req.params.id }, info, {
        new: true,
      });
      res.status(200).send({
        message: "Coupon updated successfully",
        status: 200,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    await Coupon.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Coupon Delete Successful!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
