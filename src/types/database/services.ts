import { Database } from "./base";

export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
export type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];

export type ProfileService = Database["public"]["Tables"]["profile_services"]["Row"];
export type ProfileServiceInsert = Database["public"]["Tables"]["profile_services"]["Insert"];
export type ProfileServiceUpdate = Database["public"]["Tables"]["profile_services"]["Update"];