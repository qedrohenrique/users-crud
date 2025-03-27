"use client"

import { z } from "zod"

const loginSchema = z.object({
  username: z.string().max(50),
  password: z.string(),
})

export default loginSchema;