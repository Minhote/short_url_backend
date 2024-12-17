import { Router } from "express";
import { URLSController } from "../controllers/urls";

const URLSROUTER = Router();

URLSROUTER.get("/", URLSController.getAll);
URLSROUTER.patch("/update", URLSController.updateUrlById);
URLSROUTER.post("/save", URLSController.saverURL);

export default URLSROUTER;
