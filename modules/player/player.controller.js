const { sendAddProfileMail } = require("../../utils/sendEmailHelpers");
const User = require("../user/user.model");
const Player = require("./player.model");
const bcrcypt = require("bcryptjs");

const createPlayer = async (req, res) => {
  try {
    const isExist = await Player.findOne({ email: req.body.email });
    if (!isExist) {
      if (req.files?.image) {
        req.body["image"] = req.files?.image[0]?.path;
      }
      if (req.files?.gallary) {
        const galleryPath = req.files?.gallary?.map((i) => i.path);
        req.body["gallary"] = galleryPath;
      }
      const newNewPlayer = new Player(req.body);
      const result = await newNewPlayer.save();

      res.status(200).json({
        success: true,
        message: "Player Create Success",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Player already Added",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Player Create Failed",
      error_message: error.message,
    });
  }
};

const buySubscriptionForPlayer = async (req, res) => {
  try {
    const isExist = await User.findById(req.body.id);
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        req.body.id,
        {
          addedProfile: true,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Subscription added Successfully!",
        data: result,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "User not found!",
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
      message: "Players and Coaches Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Players and Coaches Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const result = await Player.findById({ _id: req.params.id }).populate(
      "referral"
    );
    res.status(200).json(result);
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
    if (req.files?.gallary) {
      const galleryPath = req.files?.gallary?.map((i) => i.path);
      if (galleryPath?.length > 0) {
        req.body["gallary"] = [...isExist.gallary, ...galleryPath];
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
    console.log("jfkjfk");
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

const updatePlayerInfo = async (req, res) => {
  try {
    const isExist = await Player.findOne({ _id: req.params.id });

    if (req.files?.image) {
      req.body["image"] = req.files?.image[0]?.path;
    }

    if (req.files?.gallary) {
      const galleryPath = req.files?.gallary?.map((i) => i.path);
      console.log("galleryPath", [...isExist.gallary, ...galleryPath]);
      if (galleryPath?.length > 0) {
        req.body["gallary"] = [...isExist.gallary, ...galleryPath];
      }
    }

    // console.log(req.files, "req.files");
    // console.log(req.files?.image[0]);

    if (isExist) {
      const result = await Player.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Player Info Update successfully",
        data: result,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
  buySubscriptionForPlayer,
  updatePlayerInfo,
};
