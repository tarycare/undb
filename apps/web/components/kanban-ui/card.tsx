import type { IQueryRecordSchema } from '@egodb/core'
import { SelectField } from '@egodb/core'
import { Card } from '@egodb/ui'
import type { ITableBaseProps } from '../table/table-base-props'

interface IProps extends ITableBaseProps {
  record: IQueryRecordSchema
}

export const KanbanCard: React.FC<IProps> = ({ table, record }) => {
  return (
    <Card shadow="xs" radius="sm">
      {Object.entries(record.values).map(([key, value]) => {
        const field = table.schema.getField(key)
        if (field.isNone()) return null
        const f = field.unwrap()
        if (f instanceof SelectField) {
          return f.options.getById(value as string).mapOr('', (o) => o.name.value)
        }
        return <>{value}</>
      })}
    </Card>
  )
}
