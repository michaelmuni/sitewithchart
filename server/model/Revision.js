const mongoose = require("mongoose");
const config = require("../config/application");

const Schema = mongoose.Schema;

const RevisionSchema = new Schema({
  revid: {
    type: Number,
    unique: true,
    required: true
  },
  parentid: {
    type: Number,
    required: true
  },
  minor: {
    type: Boolean
  },
  user: {
    type: String,
    trim: true
  },
  anon: {
    type: Boolean,
    trim: true
  },
  userid: {
    type: Number
  },
  timestamp: {
    type: String,
    trim: true
  },
  size: {
    type: Number,
    trim: true
  },
  sha1: {
    type: String,
    trim: true
  },
  parsedcomment: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  }
});

RevisionSchema.index({ title: 1, timestamp: -1 });
RevisionSchema.index({ title: 1, timestamp: 1 });

module.exports = mongoose.model("Revision", RevisionSchema, "revisions");
