import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { AuditLog, AuditLogType } from "../../../generated-types/graphql";

const auditLogsDB = db.audit_logs

export const AuditLogsProvider = {

    /**
     * Saves audit log to database.
     * 
     * @param objectId  object modified
     * @param type      type of object
     * @param input     mutation variables
     */
    save: async (objectId: ID, type: AuditLogType, input: any) => {
        const docRef = auditLogsDB.doc();
        docRef.set({
            id: docRef.id,
            objectId,
            type,
            arguments: input,
            timestamp: new Date().toISOString()
        })
    },

    /**
     * Get audit logs of an database object.
     * 
     * @param objectId id of object to get audit logs
     * @param type type of object
     * 
     * @returns {Promise<AuditLog[]>} list of audit logs
     */
    getAuditLogs: async (objectId: string, type: string): Promise<AuditLog[]> => {
        const auditLogs = await auditLogsDB.where("objectId", "==", objectId).where("type", "==", type).get()
        return auditLogs.docs.map(doc => doc.data() as AuditLog)
    }
};