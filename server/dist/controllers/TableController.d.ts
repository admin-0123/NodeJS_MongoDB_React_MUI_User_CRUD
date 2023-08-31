import { Request, Response } from "express";
export default class TableController {
    static get(req: Request, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static deleteOne(req: Request, res: Response): Promise<void>;
    static deleteAll(req: Request, res: Response): Promise<void>;
}
