import "dotenv/config";
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import URLSROUTER from "./routes/urls.js";
import { middlewareCors } from "./middleware/cors.js";
import { Database } from "./database.types";
import { URLModel } from "./models/urls.js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// export const supabase =
//   supabaseKey && supabaseUrl ? createClient(supabaseUrl, supabaseKey) : null;

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewareCors());
app.use(express.json());
app.use("/urls", URLSROUTER);

app.get("/", (req: Request, res: Response) => {
  res.send("URLShorty Backend is runnig");
});

// Tambien actalizar el 'click' en la tabla urls de la base de datos cuando redireccione

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const resp = await URLModel.manageShortId(id);

  if (resp && resp.data) {
    // Redirigir al usuario
    res.redirect(302, resp.data.original_url);
  } else {
    res.status(404).json({ message: "No se encontró ninguna url con ese id" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
