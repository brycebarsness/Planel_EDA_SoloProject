const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const jobRouter = require("./routes/job.router.js");
const wallRouter = require("./routes/wall.router.js");
const panelRouter = require("./routes/panel.router.js");
const wallPanelRouter = require("./routes/wallPanel.router.js");
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/wall", wallRouter);
app.use("/api/panel", panelRouter);
app.use("/api/wallPanel", wallPanelRouter);
// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
