const express = require("express");
const indexRoutes = require("./routes/index.routes");
const workOrderRoutes = require("./routes/workorders.routes");
const requestIdMiddleware = require("./middleware/requestId.middleware");
const notFoundMiddleware = require("./middleware/notfound.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// 1. express.json()
// 2. requestId.middleware
// 3. logging middleware (optional)
// 4. routes
// 5. notfound.middleware
// 6. error.middleware
app.use(express.json());
app.use(requestIdMiddleware);

// optional logging
app.use((req, _res, next) => {
  console.log(`[${req.requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/", indexRoutes);
app.use("/api/workorders", workOrderRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;