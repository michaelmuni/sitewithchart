module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http://localhost:3000",
  MONGODB: process.env.MONGODB_URI || "mongodb://localhost:27017/insightdb",
  SALT_ROUNDS: 10,
  JWT_SECRET: process.env.JWT_SECRET || "articleInsight"
};
