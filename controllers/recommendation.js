const Recommendation = require('../models/recommendation');

const getRecommendations = (req, res, next) => {
  Recommendation.find({ meal: req.params.meal, user: req.user._id })
    .then((recommendations) => {
      res.json(recommendations);
    }).catch(next);
};

const createRecommendation = (req, res, next) => {
  const recommendation = new Recommendation({
    name: req.body.name,
    image: req.body.image,
    calorie: req.body.calorie,
    recipe: req.body.recipe,
    user: req.user._id
  });

  recommendation.save()
    .then((recommendation) => {
      res.status(201).json(recommendation);
    }).catch(next);
};

const updateRecommendation = (req, res, next) => {
  Recommendation.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    .then((recommendation) => {
      res.json(recommendation);
    }).catch(next);
};

const deleteRecommendation = (req, res, next) => {
  Recommendation.deleteOne({ _id: req.params.id, user: req.user._id })
    .then(() => {
      res.json({ message: 'Recommendation successfully deleted' });
    }).catch(next);
};

module.exports = {
  getRecommendations,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation
};
