import { Router } from "express";
import { URLSController } from "../controllers/urls";

const URLSROUTER = Router();

URLSROUTER.get("/", URLSController.getAll);
URLSROUTER.post("/save", URLSController.saverURL);

export default URLSROUTER;
