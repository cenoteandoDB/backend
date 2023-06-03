import {CenotesModule} from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

export const QueryResolver: CenotesModule.Resolvers["Query"] = {
    cenotes: () => CenotesProvider.getCenotes(),

    cenoteById: (parent, args, contextValue, info) => {
        return CenotesProvider.getCenoteById(args.id)
    },

    cenotesBounds: () => {
        return CenotesProvider.getCenotesBounds()
    },
    
    cenotesCsv: () => "",
};
