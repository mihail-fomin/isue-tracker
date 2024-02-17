import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, 'Название обязательно.').max(255),
  description: z.string().max(65535).optional(),
})

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Название обязательно.').max(255).optional(),
  description: z.string().max(65535).optional(),
  assignedTo: z.string().min(1, 'AssignedTo is required.').max(255).optional().nullable(),
})
