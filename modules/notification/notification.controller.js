const Notification = require("./notification.model");

const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const result = await newNotification.save();
    res.status(200).send({
      success: true,
      message: "Notification created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getMyNotification = async (req, res) => {
  try {
    const myNotification = await Notification.find({
      user: req.user?._id,
    }).sort({ _id: -1 });
    res.status(200).send(myNotification);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `Successfully removed!`,
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const putMyNotificationInSeen = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { user: req.user?._id },
      { $set: { isSeen: true } },
      { new: true }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: "No unseen notifications found for the user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User notifications updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getMyNotification,
  deleteNotification,
  putMyNotificationInSeen,
};
