"use client"

import { z } from "zod"

const createUserSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
})

export default createUserSchema;