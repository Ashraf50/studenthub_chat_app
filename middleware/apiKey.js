const apiKeyMiddleware = (req, res, next) => {
    const clientApiKey = req.query.apiKey || req.headers["x-api-key"];
    if (!clientApiKey) {
        return res.status(401).send("api key is missing");
    }
    if (clientApiKey !== process.env.API_KEY) {
        return res.status(403).send("Invalid API key");
    }
    next();
};

module.exports = apiKeyMiddleware;