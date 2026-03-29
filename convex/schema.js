import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  data: defineTable({
    heartrate: v.optional(v.number()),
    spo2: v.optional(v.number()),
    resprate: v.optional(v.number()),
    temperature: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  }),
});
