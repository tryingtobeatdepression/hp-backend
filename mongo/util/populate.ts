import { FilterQuery, Model, Schema } from "mongoose";

const getAllPopulatePaths = (schema: Schema) => {
    const paths: string[] = [];
    schema.eachPath((path, schemaType) => {
        if (schemaType.options && schemaType.options.ref) {
            paths.push(path);
        }
    });
    return paths;
};

export const populateAll = 
(model: Model<any>, filter?: FilterQuery<any>, propertiesToExclude = [
    '_id', 'password', 'updatedAt', 'createdAt', 'refreshToken'
]) => {
    const schemaPaths = getAllPopulatePaths(model.schema);
    const selectStr = propertiesToExclude.map(prop => `-${prop}`).join(' ');
    const populateOptions = schemaPaths.map(path => ({
        path,
        select: selectStr,
    }));

    let query = model.find(filter!);
    populateOptions.forEach(option => {
        query = query.populate(option);
    });

    return  query
}




