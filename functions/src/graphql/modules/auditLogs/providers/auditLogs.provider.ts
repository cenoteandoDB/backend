import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { AuditLog, AuditLogType } from "../../../generated-types/graphql";

const auditLogsDB = db.audit_logs

export const AuditLogsProvider = {
    save: async (type: AuditLogType, objectId: ID, input: any) => {
        const docRef = auditLogsDB.doc();
        docRef.set({
            id: docRef.id,
            objectId,
            type,
            arguments: input,
            timestamp: new Date().toISOString()
        })
    },

    getAuditLogs: async (objectId: string, type: string) => {
        const auditLogs = await auditLogsDB.get()
        return auditLogs.docs.map(doc => doc.data() as AuditLog)
    }
};