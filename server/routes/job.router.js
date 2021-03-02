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
  const queryText = `SELECT * FROM "job"`;
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

module.exports = router;
