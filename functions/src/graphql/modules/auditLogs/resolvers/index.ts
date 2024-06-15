import {AuditLogsModule} from "../generated-types/module-types";
import {QueryResolver} from "./query.resolver";
import {DateTimeResolver} from "graphql-scalars";

export const AuditLogsResolvers: AuditLogsModule.Resolvers = {
    Query: QueryResolver,
    DateTime: DateTimeResolver,
};
