const Datastore = require("nedb");
const db = new Datastore({ filename: "./games.db", autoload: true });

const addGame = (channelID, gameName) => {
  return new Promise((resolve, reject) => {
    // Check if the game is already in the db
    getGame(channelID, gameName)
      .then((doc) => {
        if (doc) return reject("Game already added");

        db.insert({ channelID, gameName }, (error) => {
          if (error) return reject(error);

          resolve();
        });
      })
      .catch((error) => reject(error));
  });
};

const getAllGames = (channelID) => {
  return new Promise((resolve, reject) => {
    db.find({ channelID }, (error, docs) => {
      if (error) return reject(error);
      if (docs.length === 0) return reject("No games added");

      resolve(docs);
    });
  });
};

const clearGames = (channelID) => {
  return new Promise((resolve, reject) => {
    db.remove({ channelID }, { multi: true }, (error, numRemoved) => {
      if (error) return reject(error);

      resolve(numRemoved);
    });
  });
};

const removeGame = (channelID, gameName) => {
  return new Promise((resolve, reject) => {
    getGame(channelID, gameName)
      .then((doc) => {
        if (!doc) return reject("Game not found");

        db.remove({ _id: doc._id }, (error) => {
          if (error) return reject(error);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });
};

const getGame = (channelID, gameName) => {
  return new Promise((resolve, reject) => {
    db.findOne(
      {
        channelID,
        gameName: { $regex: new RegExp(`^${gameName}$`, "i") },
      },
      (error, doc) => {
        if (error) return reject(error);

        resolve(doc);
      }
    );
  });
};

module.exports = {
  addGame,
  getAllGames,
  clearGames,
  removeGame,
  getGame,
};
