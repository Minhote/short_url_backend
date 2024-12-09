import { Tables } from "./database.types";

export type CardToView = {
  id: string;
  url_complete: string;
  days_to_expire: number;
  short_id: string;
  short_url: string;
};

export type MData = Tables<"urls"> & {
  short_url: string;
};
