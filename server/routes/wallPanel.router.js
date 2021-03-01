const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "wall_panel" WHERE "wall_id" = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get wallPanel with`, err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  // POST route code here
  console.log(req.body);
  const queryText = `INSERT INTO "wall_panel" ("wall_id", "panel_id", "quantity")
    VALUES ($1, $2, $3 ) RETURNING "id";`;
  pool
    .query(queryText, [req.body.wall_id, req.body.panel_id, req.body.quantity])
    .then((result) => {
      const createdWallPanelId = result.rows[0].id;
      console.log("New WallPanel Id:", createdWallPanelId);
      const queryText = `SELECT * FROM "wall_panel" WHERE "id" = $1`;
      pool
        .query(queryText, [createdWallPanelId])
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log(`error in createdWallPanelId with`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`error in get Wall with`, err);
      res.sendStatus(500);
    });
});
router.get("/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "wall_Panel" WHERE "job_id" = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get wallPanel with`, err);
      res.sendStatus(500);
    });
});
module.exports = router;
