import { CAlert, CButton, CCard, CCardBody } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilArrowLeft, cilPrint } from '@coreui/icons'
import { Link, useParams } from 'react-router-dom'
import { reports } from '../config/reports'
import PageHeader from '../components/PageHeader'
import FilterPanel from '../components/FilterPanel'
import DataTable from '../components/DataTable'

export default function ReportDetailPage() {
  const { reportId } = useParams()
  const report = reports[reportId]

  if (!report) {
    return <CAlert color="danger">El reporte solicitado no existe.</CAlert>
  }

  const actions = (
    <>
      <CButton as={Link} color="secondary" variant="outline" to="/reportes">
        <CIcon icon={cilArrowLeft} className="me-2" />
        Volver
      </CButton>
      <CButton color="primary" variant="outline" disabled>
        <CIcon icon={cilPrint} className="me-2" />
        Imprimir
      </CButton>
    </>
  )

  return (
    <>
      <PageHeader
        title={report.title}
        description={report.description}
        breadcrumbs={[{ label: 'Reportes', to: '/reportes' }, { label: `Reporte ${reportId}` }]}
        actions={actions}
      />

      {report.status === 'pending' ? (
        <CAlert color="warning">
          Este reporte todavía no tiene un procedimiento almacenado definido.
        </CAlert>
      ) : (
        <>
          <FilterPanel fields={report.filters} />
          <CCard className="shadow-sm result-card">
            <CCardBody className="p-0">
              <div className="result-toolbar">
                <strong>Resultados</strong>
              </div>
              <DataTable columns={report.columns} showActions={false} />
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  )
}
