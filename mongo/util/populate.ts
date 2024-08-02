import { FilterQuery, Model, Schema } from "mongoose";

export const getAllPopulatePaths = (schema: Schema) => {
    const paths: string[] = [];
    schema.eachPath((path, schemaType) => {
        if (schemaType.options && schemaType.options.ref) {
            paths.push(path);
        }
    });
    return paths;
};




