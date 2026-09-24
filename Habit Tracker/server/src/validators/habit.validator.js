const {z}=require("zod");

const createHabitSchema = z.object({
  title: z.string().min(1).max(100),
});


module.exports = {
  createHabitSchema,
};