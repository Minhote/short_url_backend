import { supabase } from "../server";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDateUTC } from "../utils/fns";

export class URLModel {
  static async getAll() {
    if (supabase === null) {
      throw new Error("Connection do not exist");
    }
    const { data, error } = await supabase.from("urls").select();
    if (error) {
      console.log(error);
      return false;
    }
    return data;
  }

  static async saveUrl(url: string) {
    if (supabase === null) {
      throw new Error("Connection do not exist");
    }

    const { data, error } = await supabase
      .from("urls")
      .insert({
        id: uuidv4(),
        original_url: url,
        short_id: nanoid(5),
        expires_at: getFormattedDateUTC(),
      })
      .select();

    if (error) {
      console.log(error);
      return false;
    }
    return data[0];
  }
}
