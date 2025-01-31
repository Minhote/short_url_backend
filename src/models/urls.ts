import { supabase } from "../server";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDateUTC } from "../utils/fns";
import { MData } from "../types";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://short-url-backend-8807.onrender.com"
    : "http://localhost:3000";

export class URLModel {
  private static validateConnection() {
    if (supabase === null) {
      throw new Error("Connection do not exist");
    }
  }

  static async getAll() {
    this.validateConnection();
    const { data, error } = await supabase.from("urls").select();
    const mutatedData: Array<MData> = data!.map((el) => ({
      ...el,
      short_url: `${baseURL}/${el.short_id}`,
    }));
    if (error) {
      console.log(error);
      return false;
    }
    return mutatedData;
  }

  static async saveUrl(url: string) {
    this.validateConnection();
    const { data, error, status } = await supabase
      .from("urls")
      .insert({
        id: uuidv4(),
        original_url: url,
        short_id: nanoid(5),
        expires_at: getFormattedDateUTC(),
      })
      .select();

    const datamorph: MData[] = data!.map((el) => ({
      ...el,
      short_url: `${baseURL}/${el.short_id}`,
    }));

    if (error) {
      console.log(error);
      return false;
    }
    return { data: datamorph[0], status };
  }

  static async manageShortId(id: string) {
    this.validateConnection();

    const { data, error, status } = await supabase
      .rpc("increment_clicks", {
        short_id_input: id,
      })
      .select();

    if (error) {
      console.log(error);
      return false;
    }

    return { data: data[0], status };
  }

  static async updateUrlById(id: string) {
    this.validateConnection();

    const { data, error, status } = await supabase
      .from("urls")
      .update({ expires_at: getFormattedDateUTC() })
      .eq("short_id", id)
      .select();

    if (error) {
      console.log(error);
      return false;
    }

    const dataMorphed: MData[] = data.map((el) => ({
      ...el,
      short_url: `${baseURL}/${el.short_id}`,
    }));
    return { data: dataMorphed, status };
  }
}
