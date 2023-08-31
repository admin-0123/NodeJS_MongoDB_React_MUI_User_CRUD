import { Request, Response } from "express";

import TableModel from '../models/TableModel';
import { TABLE_DATA } from "../utils/interface";

export default class TableController {
  // Get all items
  static async get(req: Request, res: Response) {
    await TableModel.find()
      .then(tableData => {
        if (tableData.length > 0) {
          res.status(200).json({
            success: true,
            result: tableData
          });
        } else {
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
      })
  }

  // Create a new item
  static async create(req: Request, res: Response) {
    const { firstName, lastName, email } = req.body;

    await TableModel.findOne({ email })
      .then(async (user) => {
        if (user) {
          res.status(400).json({
            success: false,
            message: "The user already exists."
          });
        } else {
          const newUser: TABLE_DATA = new TableModel({
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

  // Update an item by id
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    await TableModel.findOne({ id })
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
        } else {
          res.status(404).json({
            success: false,
            message: "User not found."
          })
        }
      })
      .catch(error => res.status(500).json({
        success: false,
        error
      }));
  }

  // Delete an item by id
  static async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    await TableModel.findOneAndDelete({ id })
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

  // Delete all items
  static async deleteAll(req: Request, res: Response) {
    await TableModel.deleteMany()
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