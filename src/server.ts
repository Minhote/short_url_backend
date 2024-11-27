import "dotenv/config";
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import URLSROUTER from "./routes/urls.js";
import { middlewareCors } from "./middleware/cors.js";
import { Database } from "./database.types";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
