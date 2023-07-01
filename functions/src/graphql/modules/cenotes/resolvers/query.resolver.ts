import {CenotesModule} from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

const cenotesProvider = new CenotesProvider()

export const QueryResolver: CenotesModule.Resolvers["Query"] = {
    cenotes: () => cenotesProvider.getCenotes(),

    cenoteById: (parent, args, contextValue, info) => {
        return cenotesProvider.getCenoteById(args.id)
    },

    cenotesBounds: () => {
        return cenotesProvider.getCenotesBounds()
    },
    
    cenotesCsv: () => "",
};
