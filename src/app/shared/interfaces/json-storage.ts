import { JsonGroup } from "./json-group";

export interface JsonStorage {
  dateTimeStamp: number;
  customer?: string;
  fields: JsonGroup[];
  extraNotes: string;
  outputNotes: string;
}
