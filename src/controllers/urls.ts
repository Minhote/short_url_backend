import { Request, Response } from "express";
import { URLModel } from "../models/urls";
import { transformURLSData } from "../utils/fns";

export class URLSController {
  static async getAll(req: Request, res: Response) {
    // Endpoint para Obtener todas las URL
    const resp = await URLModel.getAll();
    if (resp === false) {
      res.status(200).json({ message: "No existe ninguna url", data: [] });
    } else {
      const datamorph = transformURLSData(resp);
      res.status(200).json({ message: "Obteniendo URLS", data: datamorph });
    }
  }

  // Enpoint para guardar url y devolver la url minificada
  static async saverURL(req: Request, res: Response) {
    const { url } = req.body;
    const resp = await URLModel.saveUrl(url);
    if (!resp) {
      res.status(400).json({ message: "Error al insertar datos" });
    } else {
      res.status(resp.status).json(resp.data);
    }
  }

  // Endpoint para redigirir o actualizar url
  static async manageShortId(req: Request, res: Response) {
    const { id } = req.params;
    const resp = await URLModel.manageShortId(id);

    if (resp && resp.data) {
      // Redirigir al usuario
      res.redirect(302, resp.data.original_url);
    } else {
      res
        .status(404)
        .json({ message: "No se encontró ninguna url con ese id" });
    }
  }
}
