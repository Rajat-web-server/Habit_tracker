const {z}=require("zod");

const createHabitSchema = z.object({
  title: z.string().min(1).max(100),
});
const updateHabitSchema = z.object({
  title: z.string().min(1).max(100),
});

const completionSchema = z.object({
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format"
  ),
});

module.exports = {
  createHabitSchema, updateHabitSchema, completionSchema
};