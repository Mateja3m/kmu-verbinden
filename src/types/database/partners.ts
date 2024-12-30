import { Database } from "./base";

export type Partner = Database["public"]["Tables"]["partners"]["Row"];
export type PartnerInsert = Database["public"]["Tables"]["partners"]["Insert"];
export type PartnerUpdate = Database["public"]["Tables"]["partners"]["Update"];