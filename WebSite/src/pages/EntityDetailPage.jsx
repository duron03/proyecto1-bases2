import { CButton, CCard, CCardBody } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilArrowLeft, cilPencil, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { entities } from '../config/entities'
import PageHeader from '../components/PageHeader'
import DetailSection from '../components/DetailSection'
import LocationCard from '../components/LocationCard'
import DataTable from '../components/DataTable'

const invoiceColumns = [
  { key: 'StockItemName', label: 'Producto' },
  { key: 'Quantity', label: 'Cantidad' },
  { key: 'UnitPrice', label: 'Precio unitario' },
  { key: 'TaxRate', label: 'Impuesto (%)' },
  { key: 'TaxAmount', label: 'Monto impuesto' },
  { key: 'ExtendedPrice', label: 'Total' },
]

export default function EntityDetailPage({ entityKey }) {
  const definition = entities[entityKey]

  const actions = (
    <>
      <CButton as={Link} color="secondary" variant="outline" to={`/${definition.route}`}>
        <CIcon icon={cilArrowLeft} className="me-2" />
        Volver
      </CButton>
      <CButton color="primary" disabled>
        <CIcon icon={cilPencil} className="me-2" />
        Editar
      </CButton>
      <CButton color="danger" variant="outline" disabled>
        <CIcon icon={cilTrash} className="me-2" />
        Eliminar
      </CButton>
    </>
  )

  return (
    <>
      <PageHeader
        title={`Detalle de ${definition.singular}`}
        description="Vista de la información que devolverá la API."
        breadcrumbs={[{ label: definition.title, to: `/${definition.route}` }, { label: 'Detalle' }]}
        actions={actions}
      />

      <div className="detail-grid mb-4">
        {definition.detailSections.map((section) => (
          <DetailSection
            key={section.title}
            title={section.title}
            fields={section.fields}
          />
        ))}
      </div>

      {(entityKey === 'customers' || entityKey === 'suppliers') && <LocationCard />}

      {entityKey === 'sales' && (
        <CCard className="shadow-sm mt-4">
          <CCardBody className="p-0">
            <div className="result-toolbar">
              <strong>Detalle de factura</strong>
            </div>
            <DataTable columns={invoiceColumns} showActions={false} />
          </CCardBody>
        </CCard>
      )}
    </>
  )
}
