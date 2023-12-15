const Observation = require("./observation.model");

const cdToggleObservation = async (req, res) => {
  try {
    const observe = await Observation.findOne({
      $and: [{ user_id: req.body.user_id }, { target_id: req.body.target_id }],
    });
    if (observe) {
      const result = await Observation.deleteOne({
        $and: [{ user_id: observe.user_id }, { target_id: observe.target_id }],
      });
      res.status(201).json({
        success: true,
        message: "Observation Remove Success",
        data: result,
      });
    } else {
      const newObservation = new Observation(req.body);
      const result = await newObservation.save();
      res.status(200).json({
        success: true,
        message: "Observation Save Success",
        data: result,
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observation Create Failed",
      error_message: error.message,
    });
  }
};

const getMyObservations = async (req, res) => {
  try {
    const result = await Observation.find({ user_id: req.user._id }).then(
      async function (observations) {
        const populatedObservations = await Promise.all(
          observations.map(async (observation) => {
            await observation.populate({
              path: "target_id",
              model: observation.target_type,
            });
            return observation;
          })
        );
        return populatedObservations;
      }
    );
    res.status(201).json({
      success: true,
      message: "Observation Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observation Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getAllObservations = async (req, res) => {
  try {
    const result = await Observation.find({}).then(async function (
      observations
    ) {
      const populatedObservations = await Promise.all(
        observations.map(async (observation) => {
          await observation.populate({
            path: "target_id",
            model: observation.target_type,
          });
          return observation;
        })
      );
      return populatedObservations;
    });
    res.status(201).json({
      success: true,
      message: "Observations Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observations Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getObservationById = async (req, res) => {
  try {
    const result = await Observation.findOne({ _id: req.params.id }).then(
      async function (observation) {
        return observation.populate({
          path: "target_id",
          model: observation.target_type,
        });
      }
    );
    res.status(201).json({
      success: true,
      message: "Observation Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observation Retrieve Failed",
      error_message: error.message,
    });
  }
};

const updateObservationById = async (req, res) => {
  try {
    const result = await Observation.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Observation Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observation Update Failed",
      error_message: error.message,
    });
  }
};

const deleteObservationById = async (req, res) => {
  try {
    const result = await Observation.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Observation Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Observation Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  cdToggleObservation,
  getMyObservations,
  getAllObservations,
  getObservationById,
  updateObservationById,
  deleteObservationById,
};
