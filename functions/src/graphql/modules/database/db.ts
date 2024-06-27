import * as admin from "firebase-admin";
admin.initializeApp();

export const db = {
  users: admin.firestore().collection("users"),
  cenotes: admin.firestore().collection("cenotes_test"),
  species: admin.firestore().collection("species_bronze"),
  variables: admin.firestore().collection("variables_test"),
  references: admin.firestore().collection("references"),
  map_layers: admin.firestore().collection("map_layers"),
  mofs: admin.firestore().collection("measurements_or_facts_bronze"),
  audit_logs: admin.firestore().collection("audit_logs"),
  cenotes_species: admin.firestore().collection("audit_logs"),
  registration_code: admin.firestore().collection("registration_code"),
};
