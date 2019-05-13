const revisionModel = require("../model/Revision");
const validator = require("../services/validator");

module.exports = {
  // fetch a count of all records
  countAll: async (request, response, next) => {
    await revisionModel.countDocuments({}, function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve results", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched count", data: result });

        next();
      }
    });
  },

  //fetch a count of records which match the given title
  countTitle: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel.countDocuments({ title: reqTitle }, function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve results", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched count", data: result });

        next();
      }
    });
  },

  //get list of unique titles in the revisions collection
  getUniqueTitles: async (request, response, next) => {
    await revisionModel.distinct("title", function(err, result) {
      //log error to json response if one occurs
      if (err) {
        response.json({ status: "error", message: "Could not retrieve titles", data: null });

        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched list of titles", data: result });

        next();
      }
    });
  },

  //for a given title, find the latest revision done to that article
  getLatestRevision: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel
      .find({ title: reqTitle })
      .sort({ timestamp: -1 })
      .limit(1)
      .exec(function(err, result) {
        if (err) {
          response.json({ status: "error", message: "Could not retrieve revision", data: null });

          next();
          //log results to json response if successful
        } else {
          response.json({ status: "success", message: "Fetched latest revision", data: result });

          next();
        }
      });
  },
          //Get Highest Revisions based on user value
    getHighestRevisionsWithValue: async (request, response, next) => {
      reqValue = Number(request.query.value);

      await revisionModel
      .aggregate([
        { $group : {_id : "$title", "count": {$sum: 1}}},
        {$sort : {"count":-1}},
        {$limit : reqValue}
    ],function(err,result){
      if (err) {
        response.json({ status: "error", message: "Could not retrieve revision", data: null });
  
        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched highest " + reqValue + " revisions", data: result });
  
        next();
      }
    });
    },
    // Get Lowest Revisions based on user Value
    getLowestRevisionsWithValue: async (request, response, next) => {
      reqValue = Number(request.query.value);
      await revisionModel
      .aggregate([
        { $group : {_id : "$title", "count": {$sum: 1}}},
        {$sort : {"count": 1}},
        {$limit : reqValue}
    ],function(err,result){
      if (err) {
        response.json({ status: "error", message: "Could not retrieve revision", data: null });
  
        next();
        //log results to json response if successful
      } else {
        response.json({ status: "success", message: "Fetched lowest " + reqValue +  " revisions", data: result });
  
        next();
      }
    });
    },

  //for a given title, find the earliest revision done to that article
  getOldestRevision: async (request, response, next) => {
    reqTitle = request.query.title;

    await revisionModel
      .find({ title: reqTitle })
      .sort({ timestamp: 1 })
      .limit(1)
      .exec(function(err, result) {
        if (err) {
          response.json({ status: "error", message: "Could not retrieve revision", data: null });

          next();
          //log results to json response if successful
        } else {
          response.json({ status: "success", message: "Fetched oldest revision", data: result });

          next();
        }
      });
  }, 

  getMostRegisteredUsers: async (request, response, next) => {
    var mostRegisteredUsersPipeline = [
      {'$group':{'_id': {"title": "$title", "userid": "$userid"}, 'distinctUsers': {$sum:1}}},
      {'$group':{'_id': "$_id.title", 'distinctUsers': {$sum:1}}},
      {'$sort':{distinctUsers:-1}},
      {'$limit':1}	
    ]


    await revisionModel.aggregate(mostRegisteredUsersPipeline, function(err, result) { 
      if (err){

        response.json({ status: "error", message: "Problem with executing aggregate function", data: null}); 
        
        next(); 
      } else {

        response.json({ status: "success", message: "Fetched article edited by most users", data: result });

        next(); 
      }
    })
  }, 

  getLeastRegisteredUsers: async (request, response, next) => {
    var leastRegisteredUsersPipeline = [
      {'$group':{'_id': {"title": "$title", "userid": "$userid"}, 'distinctUsers': {$sum:1}}},
      {'$group':{'_id': "$_id.title", 'distinctUsers': {$sum:1}}},
      {'$sort':{distinctUsers:1}},
      {'$limit':1}	
    ]


    await revisionModel.aggregate(leastRegisteredUsersPipeline, function(err, result) { 
      if (err){

        response.json({ status: "error", message: "Problem with executing aggregate function", data: null}); 
        
        next(); 
      } else {

        response.json({ status: "success", message: "Fetched article edited by fewest users", data: result });

        next(); 
      }
    })
  }, 

  getOldestArticle: async (request, response, next) => {
    var oldestArticlePipeline = [
      {'$group': {'_id': "$title", 'oldest': { $min: "$timestamp" }}}, 
      {'$project': {'title': 1, 'olddate': { $dateFromString: { dateString: "$oldest" }}}}, 
      {'$project': {'title': 1, 'age': { $subtract: [new Date(), "$olddate"]}}}, 
      {'$sort': {age: -1}}, 
      {'$limit': 1}
    ]

      await revisionModel.aggregate(oldestArticlePipeline, function(err, result) { 
        if (err){
  
          response.json({ status: "error", message: "Problem with executing aggregate function", data: null}); 
          
          next(); 

        } else {
  
          response.json({ status: "success", message: "Fetched oldest article", data: result });
  
          next(); 
        }
      })
  }, 

  getYoungestArticle: async (request, response, next) => {
    var youngestArticlePipeline = [
      {'$group': {'_id': "$title", 'oldest': { $min: "$timestamp" }}}, 
      {'$project': {'title': 1, 'olddate': { $dateFromString: { dateString: "$oldest" }}}}, 
      {'$project': {'title': 1, 'age': { $subtract: [new Date(), "$olddate"]}}}, 
      {'$sort': {age: 1}}, 
      {'$limit': 1}
    ]

      await revisionModel.aggregate(youngestArticlePipeline, function(err, result) { 
        if (err){
  
          response.json({ status: "error", message: "Problem with executing aggregate function", data: null}); 
          
          next(); 

        } else {
  
          response.json({ status: "success", message: "Fetched youngest article", data: result });
  
          next(); 
        }
      })
    }
};
