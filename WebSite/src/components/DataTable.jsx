import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

export default function DataTable({ columns, showActions = true }) {
  const columnCount = columns.length + (showActions ? 1 : 0)

  return (
    <div className="table-responsive">
      <CTable align="middle" className="data-table mb-0">
        <CTableHead>
          <CTableRow>
            {columns.map((column) => (
              <CTableHeaderCell key={column.key} scope="col">
                {column.label}
              </CTableHeaderCell>
            ))}
            {showActions && (
              <CTableHeaderCell className="text-end action-column" scope="col">
                Acciones
              </CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell colSpan={columnCount} className="text-center text-body-secondary py-5">
              Los datos se mostrarán cuando la interfaz se conecte con la API.
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}
