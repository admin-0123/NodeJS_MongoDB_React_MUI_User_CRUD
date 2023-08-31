"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB_1 = require("./config/connectDB");
const routes_1 = require("./routes");
dotenv.config();
(0, connectDB_1.default)();
const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
//# sourceMappingURL=index.js.map