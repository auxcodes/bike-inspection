import { JsonField } from "./json-field";

export interface JsonGroup {
  groupId: string;
  groupLabel: string;
  fields: JsonField[];
}
