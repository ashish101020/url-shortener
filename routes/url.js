const express = require("express")
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url.js');

const urlRoute = express.Router();

urlRoute.post('/', handleGenerateNewShortURL);

urlRoute.get('/analytics/:shortId', handleGetAnalytics);

module.exports = urlRoute;