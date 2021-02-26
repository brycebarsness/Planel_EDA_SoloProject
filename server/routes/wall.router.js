const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "wall" WHERE "id" = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get one wall with`, err);
      res.sendStatus(500);
    });
});

router.post("/addWall", (req, res) => {
  // POST route code here
  console.log(req.body);
  const queryText = `INSERT INTO "wall" ("job_id", "length" )
    VALUES ($1, $2 ) RETURNING "id";`;
  pool
    .query(queryText, [req.body.job_id, req.body.length])
    .then((result) => {
      const createdWallId = result.rows[0].id;
      console.log("New Wall Id:", createdWallId);
      const queryText = `SELECT * FROM "wall" WHERE "id" = $1`;
      pool
        .query(queryText, [createdWallId])
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.log(`error in post Wall with`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`error in get Wall with`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
