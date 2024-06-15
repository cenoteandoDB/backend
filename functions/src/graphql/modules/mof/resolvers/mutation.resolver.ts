import {MofModule} from "../generated-types/module-types";
import {MofProvider} from "../providers/mof.provider";

const mofProvider = new MofProvider();

export const MutationResolver: MofModule.Resolvers["Mutation"] = {
    createMof: (parent, args, contextValue, info) => {
        return mofProvider.createMoF(args.new_mof);
    },
    deleteMof: (parent, args, contextValue, info) => {
        return mofProvider.deleteMoF(args.delete_mof_input);
    },
};
