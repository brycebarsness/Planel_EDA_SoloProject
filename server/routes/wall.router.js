const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  // GET one wall for panel details
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
  // POST to add new wall, returning wall that's created
  console.log(req.body);
  const queryText = `INSERT INTO "wall" ("job_id", "length" )
    VALUES ($1, $2 ) RETURNING "id";`; // this id selects wall to return below
  pool
    .query(queryText, [req.body.job_id, req.body.length])
    .then((result) => {
      const createdWallId = result.rows[0].id;
      console.log("New Wall Id:", createdWallId);
      const queryText = `SELECT * FROM "wall" WHERE "id" = $1`; //id from above
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

router.get("/job/:id", (req, res) => {
  // GET all wall for a job, selected by job id
  const queryText = `SELECT * FROM "wall" WHERE "job_id" = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in get one wall with`, err);
      res.sendStatus(500);
    });
});

router.delete("/delete/:id", (req, res) => {
  // Delete wall by id, make sure id being passed in is a Number
  const id = Number(req.params.id);
  const queryText = `DELETE FROM "wall" WHERE "id" = $1;`;
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
  // Edit wall length, select by id
  const newLength = req.body;
  console.log(newLength);
  const id = Number(req.params.id);
  const queryText = ` UPDATE "wall" 
   SET "length" = $1
 WHERE "id" = $2;`;
  pool
    .query(queryText, [newLength.length, id])
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
