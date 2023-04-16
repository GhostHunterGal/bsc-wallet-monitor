// node.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const { monitorBalances } = require('./monitor');

const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/start-monitoring", async (req, res, next) => {
   try {
     console.log("Received a request to start monitoring...");
     const address = req.query.address; // Get the address from the query parameter
     const balances = await monitorBalances(address); // Pass the address to the function
     console.log("Balances:", balances);
     console.log("Monitoring complete.");
     res.json(balances);
   } catch (err) {
     console.error(err);
     next(err);
   }
 });

// Add the error handling middleware at the end, right before app.listen
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, '0.0.0.0', () => {
   console.log(`App listening at ${port}`);
});
