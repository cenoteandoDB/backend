import * as admin from "firebase-admin"

admin.initializeApp();

export const db = {
    users: admin.firestore().collection('users'),
    cenotes: admin.firestore().collection('cenotes'),
    species: admin.firestore().collection('species'),
    references: admin.firestore().collection('references'),
    audit_logs: admin.firestore().collection('audit_logs')
}