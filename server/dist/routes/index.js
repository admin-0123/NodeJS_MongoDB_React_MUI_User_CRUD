"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const table_1 = require("./table");
const router = express.Router();
router.use('/', table_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map