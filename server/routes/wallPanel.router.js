const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "wall_Panel" WHERE "wall_id" = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get wallPanel with`, err);
      res.sendStatus(500);
    });
});

router.post("/addWallPanel", (req, res) => {
  // POST route code here
  console.log(req.body);
  const queryText = `INSERT INTO "wall_panel" ("wall_id", "panel_id", "length")
    VALUES ($1, $2, $3 ) RETURNING "wall_id";`;
  pool
    .query(queryText, [req.body.wall_id, req.body.panel_id, req.body.length])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
