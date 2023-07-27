import { rootFilter, tableIdSchema } from '@undb/core'
import * as z from 'zod'

export const getTrashRecordsQueryInput = z.object({
  tableId: tableIdSchema,
  filter: rootFilter.optional(),
  q: z.string().nonempty().optional(),
})
