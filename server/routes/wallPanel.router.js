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
router.get("/job/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT
"l"."length",
	SUM("p"."quantity")
FROM "wall" "w"
INNER JOIN "wall_panel" "p" 
	ON "w"."id" = "p"."wall_id"
INNER JOIN "job" "j"
    ON "j"."id" = "w"."job_id"
INNER JOIN "panel" "l"
    ON "p"."panel_id" = "l"."id"
	WHERE "j"."id" = $1
	GROUP BY "l"."length";  `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get wallPanel/job with`, err);
      res.sendStatus(500);
    });
});
router.get("/wall/:id", (req, res) => {
  // GET route code here
  const queryText = `SELECT
  "p"."id" AS "wall_panel_id",
"l"."length" AS "panel_length",
"p"."quantity" AS "wall_panel_quantity",
"w"."length" AS "wall_length"
FROM "wall_panel" "p"
INNER JOIN "wall" "w" 
	ON "w"."id" = "p"."wall_id"
INNER JOIN "panel" "l"
    ON "p"."panel_id" = "l"."id"
	WHERE "w"."id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get wallPanel/wall with`, err);
      res.sendStatus(500);
    });
});

router.delete("/delete/:id", (req, res) => {
  // GET route code here
  const id = Number(req.params.id);
  const queryText = `DELETE FROM "wall_panel" WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then(() => {
      console.log(`Deleted at id: ${id} successfully`);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in delete", err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  // GET route code here
  const newValues = req.body;
  console.log(newValues);
  const id = Number(req.params.id);
  const queryText = `UPDATE "wall_panel" 
   SET "panel_id" = $1,
       "quantity" = $2
 WHERE "wall_panel"."id" = $3;`;
  pool
    .query(queryText, [req.body.panel_id, req.body.quantity, id])
    .then(() => {
      console.log(`Update at id: ${id} successfully`);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in Update", err);
      res.sendStatus(500);
    });
});

module.exports = router;
