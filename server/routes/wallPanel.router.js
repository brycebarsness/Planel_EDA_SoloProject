const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  // GET all wall_panel instances, by wall.
  // Each (panel size and length) is an instance.
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
  // POST new wall panel instance, then return by id
  console.log(req.body);
  const queryText = `INSERT INTO "wall_panel" ("wall_id", "panel_id", "quantity")
    VALUES ($1, $2, $3 ) RETURNING "id";`; // this id is the selector for below
  pool
    .query(queryText, [req.body.wall_id, req.body.panel_id, req.body.quantity])
    .then((result) => {
      const createdWallPanelId = result.rows[0].id;
      console.log("New WallPanel Id:", createdWallPanelId);
      const queryText = `SELECT * FROM "wall_panel" WHERE "id" = $1`; //id from above
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
  // GET wall panel instance by job id, all panel sizes and quantity for job
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
  // GET all wall panel instances by wall id, all panel size and quantity for wall
  const queryText = `SELECT
  "p"."id" AS "wall_panel_id",
"l"."length" AS "panel_length",
"p"."quantity" AS "wall_panel_quantity",
"w"."length" AS "wall_length",
"p"."wall_id" AS "wall_id"
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
  // Delete wall panel instance by id
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
  // Edit wall panel instance by id
  const newValues = req.body;
  console.log(newValues);
  const id = Number(req.params.id);
  const queryText = `UPDATE "wall_panel" 
   SET "panel_id" = $1,
       "quantity" = $2
 WHERE "wall_panel"."id" = $3;`;
  pool
    .query(queryText, [req.body.panel_id, Number(req.body.quantity), id])
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
