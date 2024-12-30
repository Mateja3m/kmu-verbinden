import { Database } from "./base";

export type Expert = Database["public"]["Tables"]["experts"]["Row"];
export type ExpertInsert = Database["public"]["Tables"]["experts"]["Insert"];
export type ExpertUpdate = Database["public"]["Tables"]["experts"]["Update"];