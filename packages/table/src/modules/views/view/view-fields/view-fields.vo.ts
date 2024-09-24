import { ValueObject } from "@undb/domain"
import { z } from "@undb/zod"
import { isEqual } from "radash"
import type { TableDo } from "../../../../table.do"
import { fieldId, type Field } from "../../../schema"

export const viewField = z.object({
  fieldId,
  hidden: z.boolean(),
})

export const viewFields = viewField.array()

export type IViewFields = z.infer<typeof viewFields>

export class ViewFields extends ValueObject<IViewFields> {
  constructor(table: TableDo, props: IViewFields) {
    const fields = table.schema.fields.map((field) => {
      const exists = props.find((f) => f.fieldId === field.id.value)
      if (exists) {
        return exists
      }
      return {
        fieldId: field.id.value,
        hidden: false,
      }
    })
    super(fields)
  }

  static default(table: TableDo): ViewFields {
    return new ViewFields(table, [])
  }

  public isEqual(sort: IViewFields): boolean {
    return isEqual(sort, this.props)
  }

  public toJSON(): IViewFields {
    return [...this.props]
  }

  public fieldIds(): Set<string> {
    return this.props.reduce((acc, { fieldId }) => acc.add(fieldId), new Set<string>())
  }

  public getVisibleFields(): string[] {
    return this.props.filter(({ hidden }) => !hidden).map(({ fieldId }) => fieldId)
  }

  public getVisibleFieldsCount(): number {
    return this.getVisibleFields().length
  }

  public getHiddenFields(): string[] {
    return this.props.filter(({ hidden }) => hidden).map(({ fieldId }) => fieldId)
  }

  public getHiddenFieldsCount(): number {
    return this.getHiddenFields().length
  }

  public addField(table: TableDo, field: Field): ViewFields {
    return new ViewFields(table, [...this.props, { fieldId: field.id.value, hidden: false }])
  }

  public deleteField(table: TableDo, field: Field): ViewFields {
    return new ViewFields(
      table,
      this.props.filter((f) => f.fieldId !== field.id.value),
    )
  }

  public showAllFields(table: TableDo): ViewFields {
    return new ViewFields(
      table,
      this.props.map((field) => ({ ...field, hidden: false })),
    )
  }

  public hideAllFields(table: TableDo): ViewFields {
    return new ViewFields(
      table,
      this.props.map((field) => ({ ...field, hidden: true })),
    )
  }
}
