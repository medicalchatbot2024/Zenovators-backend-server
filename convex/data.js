import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    heartrate: v.optional(v.number()),
    spo2: v.optional(v.number()),
    resprate: v.optional(v.number()),
    temperature: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("data", { 
      heartrate: args.heartrate,
      spo2: args.spo2,
      resprate: args.resprate,
      temperature: args.temperature,
      createdAt: Date.now()
    });
    return newTaskId;
  },
});
