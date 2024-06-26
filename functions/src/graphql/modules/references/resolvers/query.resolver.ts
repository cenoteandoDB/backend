import {ReferencesModule} from "../generated-types/module-types";
import {ReferenceProvider} from "../providers/reference.provider";

const referenceProvider = new ReferenceProvider();

export const QueryResolver: ReferencesModule.Resolvers["Query"] = {
    references: () => {
        return referenceProvider.getReferences();
    },
    referenceById: (parent, args, contextValue, info) => {
        return referenceProvider.getReferenceById(args.id);
    },
};
