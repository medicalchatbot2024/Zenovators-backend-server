import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  data: defineTable({
    heartrate: v.optional(v.string()),
    spo2: v.optional(v.string()),
    resprate: v.optional(v.string()),
    temperature: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }),
});
