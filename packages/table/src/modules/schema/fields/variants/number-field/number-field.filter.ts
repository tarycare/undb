import { z } from 'zod'
import { baseFilter } from '../../../../filters/base.filter'

export const numberFieldFilter = z.union([
  z
    .object({
      op: z.literal('eq'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('neq'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('gt'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('gte'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('lt'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('lte'),
      value: z.number(),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('is_empty'),
    })
    .merge(baseFilter),
  z
    .object({
      op: z.literal('is_not_empty'),
    })
    .merge(baseFilter),
])

export type INumberFieldFilterSchema = typeof numberFieldFilter
export type INumberFieldFilter = z.infer<typeof numberFieldFilter>
