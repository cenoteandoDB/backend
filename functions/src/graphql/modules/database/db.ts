import * as admin from "firebase-admin";
admin.initializeApp();

export const db = {
  users: admin.firestore().collection("users"),
  cenotes: admin.firestore().collection("cenotes_test"),
  species: admin.firestore().collection("species_test"),
  variables: admin.firestore().collection("variables_test"),
  references: admin.firestore().collection("references_test"),
  map_layers: admin.firestore().collection("map_layers"),
  mofs: admin.firestore().collection("mof_test"),
  audit_logs: admin.firestore().collection("audit_logs"),
  cenotes_species: admin.firestore().collection("audit_logs"),
  registration_code: admin.firestore().collection("registration_code"),
};
