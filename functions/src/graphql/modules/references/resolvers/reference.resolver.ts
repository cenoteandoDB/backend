import { ReferencesModule } from "../generated-types/module-types";
import { StorageProvider } from "../../gcp/gcp.provider";

export const ReferenceResolver: ReferencesModule.Resolvers["Reference"] = {
  pdf_url: (parent: any) => StorageProvider.getReference(parent.pdf_name),
};
