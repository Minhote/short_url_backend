import { Router } from "express";
import { URLSController } from "../controllers/urls";

const URLSROUTER = Router();

// Pendiente definir enpoint para actualizar tiempo a url expirada.

URLSROUTER.get("/", URLSController.getAll);
URLSROUTER.post("/save", URLSController.saverURL);

export default URLSROUTER;
