import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    heartrate: v.optional(v.string()),
    spo2: v.optional(v.string()),
    resprate: v.optional(v.string()),
    temperature: v.optional(v.string()),
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

export const getRecentData = query({
  args: {},
  handler: async (ctx) => {
    // Get the most recent reading from the 'data' table
    return await ctx.db.query("data").order("desc").first();
  },
});
