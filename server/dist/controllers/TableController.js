"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableModel_1 = require("../models/TableModel");
class TableController {
    static async get(req, res) {
        await TableModel_1.default.find()
            .then(tableData => {
            if (tableData.length > 0) {
                res.status(200).json({
                    success: true,
                    result: tableData
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "No data found."
                });
            }
        })
            .catch(error => {
            res.status(500).json({
                success: false,
                error
            });
        });
    }
    static async create(req, res) {
        const { firstName, lastName, email } = req.body;
        await TableModel_1.default.findOne({ email })
            .then(async (user) => {
            if (user) {
                res.status(400).json({
                    success: false,
                    message: "The user already exists."
                });
            }
            else {
                const newUser = new TableModel_1.default({
                    firstName,
                    lastName,
                    email
                });
                await newUser.save()
                    .then(user => res.status(200).json({
                    success: true,
                    message: "User created successfully.",
                    result: user
                }))
                    .catch(error => res.status(500).json({
                    success: false,
                    error
                }));
            }
        });
    }
    static async update(req, res) {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        await TableModel_1.default.findOne({ id })
            .then(async (user) => {
            if (user) {
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                await user.save()
                    .then(user => res.status(200).json({
                    success: true,
                    message: "Successfully updated.",
                    result: user
                }))
                    .catch(error => res.status(500).json({
                    success: false,
                    error
                }));
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }
        })
            .catch(error => res.status(500).json({
            success: false,
            error
        }));
    }
    static async deleteOne(req, res) {
        const { id } = req.params;
        await TableModel_1.default.findOneAndDelete({ id })
            .then(() => {
            res.status(200).json({
                success: true,
                message: "Successfully deleted."
            });
        })
            .catch(error => res.status(500).json({
            success: false,
            error
        }));
    }
    static async deleteAll(req, res) {
        await TableModel_1.default.deleteMany()
            .then(() => {
            res.status(200).json({
                success: true,
                message: "Deleted all entry."
            });
        })
            .catch(error => res.status(500).json({
            success: false,
            error
        }));
    }
}
exports.default = TableController;
//# sourceMappingURL=TableController.js.map