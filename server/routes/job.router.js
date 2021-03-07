const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
// router.get("/", (req, res) => {
//   // GET route code here
// });

/**
 * POST route template
 */
// router.post("/", (req, res) => {
//   // POST route code here
// });
router.get("/", (req, res) => {
  // GET route code here
  id = req.params.id;
  const queryText = `SELECT 
	"j"."id", 
	"j"."user_id",
	"j"."contractor",
	"j"."street_address",
	"j"."city",
	"j"."state",
	"j"."zip",
	"j"."start_date", 
	"j"."outside_corners", 
	"j"."inside_corners",
	"j"."status",
	"j"."complete", 
	"j"."comments", 
	"j"."finish_date", 
	SUM("wp"."quantity") AS "panel_sum"
FROM "job" "j"
INNER JOIN "wall" "w"
ON "j"."id" = "w"."job_id"
INNER JOIN "wall_panel" "wp"
ON "wp"."wall_id" = "w"."id"
GROUP BY "j"."id";`;

  // `SELECT * FROM "job"`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get oneJob with`, err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  // GET route code here
  id = req.params.id;
  const queryText = `SELECT * FROM "job" WHERE "id" = ${id}`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get oneJob with`, err);
      res.sendStatus(500);
    });
});

router.post("/addjob", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.body);
  const queryText = `INSERT INTO "job" ("user_id", "contractor", 
  "street_address", "city","state", "zip", "start_date", 
  "outside_corners", "inside_corners", "status", "complete",
   "comments", "finish_date")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
    $9, $10, $11, $12, $13 ) RETURNING "id";`;
  pool
    .query(queryText, [
      req.user.id,
      req.body.contractor,
      req.body.street_address,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.start_date,
      req.body.outside_corners,
      req.body.inside_corners,
      req.body.status,
      req.body.complete,
      req.body.comments,
      req.body.finish_date,
    ])
    .then((result) => {
      const createdJobId = result.rows[0].id;
      console.log("New Job Id:", createdJobId);
      const queryText = `SELECT * FROM "job" WHERE "id" = $1`;
      pool
        .query(queryText, [createdJobId])
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.log(`error in get oneJob with`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`error in get oneJob with`, err);
      res.sendStatus(500);
    });
});

router.delete("/delete/:id", (req, res) => {
  // GET route code here
  const id = Number(req.params.id);
  const queryText = `DELETE FROM "job" WHERE "id" = $1;`;
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
  const newJob = req.body;
  console.log(newJob);
  const id = Number(req.params.id);
  const queryText = `UPDATE "job" 
   SET "contractor" = $1,
   "street_address" = $2,
   "city" = $3,
   "state" = $4,
   "zip" = $5,
   "start_date" = $6,
   "outside_corners" = $7,
   "inside_corners" = $8,
   "status" = $9,
   "complete" = $10,
   "comments" = $11,
   "finish_date" = $12
 WHERE "id" = $13;`;
  pool
    .query(queryText, [
      newJob.contractor,
      newJob.street_address,
      newJob.city,
      newJob.state,
      newJob.zip,
      newJob.start_date,
      newJob.outside_corners,
      newJob.inside_corners,
      newJob.status,
      newJob.complete,
      newJob.comments,
      newJob.finish_date,
      id,
    ])
    .then(() => {
      console.log(`Update at id: ${id} successfully`);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in Job Update", err);
      res.sendStatus(500);
    });
});

module.exports = router;
