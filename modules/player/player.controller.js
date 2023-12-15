const User = require("../user/user.model");
const Player = require("./player.model");

const createPlayer = async (req, res) => {
  try {
    const isExist = await User.findById({ _id: req.body.user });
    if (isExist) {
      if (req.files) {
        let files = [];
        if (req.files?.gallery) {
          for (let i = 0; i < req.files?.gallery.length; i++) {
            files.push(req.files?.gallery[i].path);
          }
          req.body["gallery"] = files;
        }
      }
      const newNewPlayer = new Player(req.body);
      const result = await newNewPlayer.save();
      res.status(200).json({
        success: true,
        message: "Player Create Success",
        data: result,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Player Create Failed. User Not Found",
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Player Create Failed",
      error_message: error.message,
    });
  }
};

const getPlayers = async (req, res) => {
  try {
    const result = await Player.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "Players Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Players Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const result = await Player.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Player Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Player Retrieve Failed",
      error_message: error.message,
    });
  }
};

const UpdatePlayerById = async (req, res) => {
  try {
    if (req.files) {
      let files = [];
      if (req.files?.gallery) {
        for (let i = 0; i < req.files?.gallery.length; i++) {
          files.push(req.files?.gallery[i].path);
        }
        req.body["gallery"] = files;
      }
    }
    const result = await Player.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Player Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Player Update Failed",
      error_message: error.message,
    });
  }
};

const DeletePlayerById = async (req, res) => {
  try {
    const result = await Player.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Player Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Player Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
};
