import {z} from "zod";

export const createRequestSchema = z.object({
    requestInfo: z.object({
        expectedAmount: z.number(),
        payeeAddress: z.string(),
        payerAddress: z.string(),
        timestamp: z.string()
    }),
    contentData: z.object({
        reason: z.string(),
        dueDate: z.string()
    }),
    signerAddress: z.string()
});

export type CreateRequestParams = z.infer<typeof createRequestSchema>;