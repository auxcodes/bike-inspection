import { JsonGroup } from "./json-group";

export interface JsonStorage {
  dateTimeStamp: number;
  reference?: string;
  fields: JsonGroup[];
  extraNotes: string;
  totalCost: number;
  outputNotes: string;
}
