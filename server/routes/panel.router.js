const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  //route to get all panels in db, order by size
  const queryText = `SELECT * FROM "panel" ORDER BY "length";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`GET query error ${queryText}`, err);
      res.sendStatus(500);
    });
});
router.post("/", (req, res) => {
  // router to add new panel
  const queryText = `INSERT INTO "panel"`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get one wall with`, err);
      res.sendStatus(500);
    });
});
module.exports = router;
