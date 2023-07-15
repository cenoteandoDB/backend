import * as admin from "firebase-admin"

admin.initializeApp();

export const db = {
    users: admin.firestore().collection('users'),
    cenotes: admin.firestore().collection('cenotes'),
    species: admin.firestore().collection('species'),
    variables: admin.firestore().collection('variables'),
    references: admin.firestore().collection('references'),
    mofs: admin.firestore().collection('mofs'),
    audit_logs: admin.firestore().collection('audit_logs')
}