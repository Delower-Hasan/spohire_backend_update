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
    const myNotification = await Notification.find({ user: req.user?._id });
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

module.exports = {
  createNotification,
  getMyNotification,
  deleteNotification,
};
