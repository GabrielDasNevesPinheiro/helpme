"use client";

import * as z from "zod";

const setupFormSchema = z.object({
    sector: z.string(),
    company: z.string(),
    level: z.enum(["0", "1", "2"]),
});

export default setupFormSchema;