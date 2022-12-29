const router = require("express").Router();
const recommendationController = require("../controllers/recommendation");
const { validateToken } = require("../middlewares/authentication");

router.get(
  "/:meal",
  validateToken,
  recommendationController.getRecommendations
);
router.post("/", validateToken, recommendationController.createRecommendation);
router.put(
  "/:id",
  validateToken,
  recommendationController.updateRecommendation
);
router.delete(
  "/:id",
  validateToken,
  recommendationController.deleteRecommendation
);

module.exports = router;
