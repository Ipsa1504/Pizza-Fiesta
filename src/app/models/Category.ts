import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// FIX: removes TypeScript “complex union” error
export const Category = (models.Category as any) || model("Category", CategorySchema);

export default Category;
