import {CenotesModule} from "../generated-types/module-types";
import {MutationResolver} from "./mutation.resolver";
import {QueryResolver} from "./query.resolver";
// import {CenoteResolver} from "./cenote.resolver";
import {
    DateTimeResolver,
    JSONResolver,
    LatitudeResolver,
    LongitudeResolver,
    URLResolver,
} from "graphql-scalars";

export const CenotesResolvers: CenotesModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    // Cenote: CenoteResolver,
    Latitude: LatitudeResolver,
    Longitude: LongitudeResolver,
    DateTime: DateTimeResolver,
    URL: URLResolver,
    JSON: JSONResolver,
};
