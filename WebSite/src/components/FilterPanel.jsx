import { CButton, CCard, CCardBody, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilReload, cilSearch } from '@coreui/icons'

function FilterField({ field }) {
  const inputId = `filter-${field.name}`

  return (
    <div>
      <CFormLabel htmlFor={inputId}>{field.label}</CFormLabel>
      {field.type === 'select' ? (
        <CFormSelect id={inputId} defaultValue="">
          <option value="">Todos</option>
        </CFormSelect>
      ) : (
        <CFormInput
          id={inputId}
          type={field.type || 'text'}
          placeholder={field.placeholder}
        />
      )}
    </div>
  )
}

export default function FilterPanel({ fields = [] }) {
  return (
    <CCard className="filter-card shadow-sm">
      <CCardBody>
        <div className="filter-grid">
          {fields.map((field) => (
            <FilterField key={field.name} field={field} />
          ))}
          <div className="filter-actions">
            <CButton type="button" color="primary" disabled>
              <CIcon icon={cilSearch} className="me-2" />
              Consultar
            </CButton>
            <CButton type="button" color="secondary" variant="outline" disabled>
              <CIcon icon={cilReload} className="me-2" />
              Restaurar
            </CButton>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}
