const axios = require("axios");

const getRandomGame = (start, end, tries) => {
  return new Promise((resolve, reject) => {
    if (start >= end) return reject("Start is the same or largest than end");

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) return reject("No API key provided");

    const data = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: API_KEY,
        n: tries,
        min: start,
        max: end,
        replacement: true,
      },
      id: 42,
    };

    axios
      .post("https://api.random.org/json-rpc/2/invoke", data)
      .then((response) => {
        const { random, requestsLeft } = response.data.result;

        const counts = getCounts(random.data);

        resolve({
          requestsLeft,
          counts,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getCounts = (numbers) => {
  if (!numbers) return null;

  var counts = {};
  numbers.forEach((number) => (counts[number] = 1 + (counts[number] || 0)));
  return counts;
};

module.exports = {
  getRandomGame,
};
