import { JsonGroup } from "./json-group";

export interface JsonStorage {
  fields: JsonGroup[];
  extraNotes: string;
  outputNotes: string;
}
