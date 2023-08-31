"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const TableController_1 = require("../controllers/TableController");
const router = express.Router();
router.get('/table', TableController_1.default.get);
router.post('/table', TableController_1.default.create);
router.put('/table', TableController_1.default.update);
router.delete('/table', TableController_1.default.deleteOne);
router.delete('/table/all', TableController_1.default.deleteAll);
exports.default = router;
//# sourceMappingURL=table.js.map