const revisionController = require("../controllers/revision.controller");
const express = require("express");
const router = express.Router();

router.get("/", revisionController.countAll);
router.get("/countTitle", revisionController.countTitle)
router.get("/uniqueTitles", revisionController.getUniqueTitles)
router.get("/latestRevision", revisionController.getLatestRevision)
router.get("/oldestRevision", revisionController.getOldestRevision)
router.get("/getHighestRevisionsWithValue", revisionController.getHighestRevisionsWithValue)
router.get("/getLowestRevisionsWithValue", revisionController.getLowestRevisionsWithValue)
router.get("/getMostRegUsers", revisionController.getMostRegisteredUsers);
router.get("/getLeastRegUsers", revisionController.getLeastRegisteredUsers);
router.get("/getOldestArticle", revisionController.getOldestArticle);
router.get("/getYoungestArticle", revisionController.getYoungestArticle);
router.get("/getRevisionsByUserType", revisionController.getRevisionsByUserType);

module.exports = router;