import * as admin from "firebase-admin";
admin.initializeApp();

export const db = {
  audit_logs: admin.firestore().collection("audit_logs"),
  cenotes: admin.firestore().collection("cenotes_test"),
  cenotes_species: admin.firestore().collection("audit_logs"),
  map_layers: admin.firestore().collection("map_layers"),
  mofs: admin.firestore().collection("mof_test"),
  permissions: admin.firestore().collection("permissions"),
  references: admin.firestore().collection("references_test"),
  registration_code: admin.firestore().collection("registration_code"),
  requestMofsModification: admin.firestore().collection("mof_request_modification"),
  species: admin.firestore().collection("species_test"),
  users: admin.firestore().collection("users"),
  variables: admin.firestore().collection("variables_test"),
};
