import { z } from "@undb/zod"
import { templateCategory } from "../template/value-objects/template-category.vo"
import { templateId } from "../template/value-objects/template-id.vo"
import { templateName } from "../template/value-objects/template-name.vo"
import { templateSchemaVariants } from "../template/value-objects/template-schema-variants.vo"

export const templateDTO = z.object({
  id: templateId,
  name: templateName,
  description: z.string().optional(),
  category: templateCategory,
  template: templateSchemaVariants,
})

export type ITemplateDTO = z.infer<typeof templateDTO>
