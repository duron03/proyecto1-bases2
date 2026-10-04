import { CButton, CCard, CCardBody } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { entities } from '../config/entities'
import PageHeader from '../components/PageHeader'
import FilterPanel from '../components/FilterPanel'
import DataTable from '../components/DataTable'

export default function EntityListPage({ entityKey }) {
  const definition = entities[entityKey]

  const createButton = (
    <CButton as={Link} color="primary" to={`/${definition.route}/nuevo`}>
      <CIcon icon={cilPlus} className="me-2" />
      Nuevo {definition.singular}
    </CButton>
  )

  return (
    <>
      <PageHeader
        title={definition.title}
        description={definition.description}
        actions={createButton}
      />
      <FilterPanel fields={definition.filters} />
      <CCard className="shadow-sm result-card">
        <CCardBody className="p-0">
          <div className="result-toolbar">
            <strong>Resultados</strong>
          </div>
          <DataTable columns={definition.columns} />
        </CCardBody>
      </CCard>
    </>
  )
}
