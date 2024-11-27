import { Tables } from "../database.types";
import { CardToView } from "../types";

export function getFormattedDateUTC(date?: Date, numberOfDays = 1) {
  if (date) {
    // Adelantar 1 día
    date.setDate(date.getDate() + numberOfDays);

    // Obtener cada componente
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    // Formatear como "YYYY-MM-DD HH:MM:SS.MS+00"
    // Formato en el que se almacena TIMESTAMP en PostgreSQL
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
  }
  const now = new Date();

  // Adelantar 3 meses
  now.setUTCMonth(now.getUTCMonth() + 3);

  // Obtener cada componente
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(now.getUTCMilliseconds()).padStart(3, "0");

  // Formatear como "YYYY-MM-DD HH:MM:SS.MS+00"
  // Formato en el que se almacena TIMESTAMP en PostgreSQL
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
}

export function transformURLSData(data: Tables<"urls">[]): CardToView[] {
  const dataMorphed: CardToView[] = [];
  data.map(({ id, original_url, short_id, expires_at }) => {
    const daysToExpire = getDaysToExpire(expires_at!);
    const obj: CardToView = {
      id: "",
      url_complete: "",
      days_to_expire: 0,
      short_id: "",
    };
    obj.id = id;
    obj.url_complete = original_url;
    obj.short_id = short_id;
    obj.days_to_expire = daysToExpire;
    dataMorphed.push(obj);
  });
  return dataMorphed;
}

export function getDaysToExpire(expires_at: string) {
  const now = new Date();
  const expire = new Date(expires_at);
  const utcNow = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const utcExpiration = new Date(
    Date.UTC(expire.getFullYear(), expire.getMonth(), expire.getDate())
  );

  const millisecondsToDifference = utcExpiration.getTime() - utcNow.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(millisecondsToDifference / msPerDay);
  return days > 0 ? days : 0;
}
