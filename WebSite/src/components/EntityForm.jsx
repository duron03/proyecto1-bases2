import { CButton, CCard, CCardBody, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'
import { Link } from 'react-router-dom'
import InvoiceLinesEditor from './InvoiceLinesEditor'

function FormField({ field }) {
  const inputId = `field-${field.name}`
  const fieldClass = field.fullWidth ? 'form-field-full' : ''

  if (field.type === 'checkbox') {
    return (
      <div className={fieldClass}>
        <CFormCheck id={inputId} label={field.label} />
      </div>
    )
  }

  return (
    <div className={fieldClass}>
      <CFormLabel htmlFor={inputId}>
        {field.label}
        {field.required && <span className="required-mark"> *</span>}
      </CFormLabel>

      {field.type === 'select' && (
        <CFormSelect id={inputId} defaultValue="">
          <option value="">Seleccione…</option>
        </CFormSelect>
      )}

      {field.type === 'textarea' && (
        <CFormTextarea id={inputId} rows={3} />
      )}

      {field.type !== 'select' && field.type !== 'textarea' && (
        <CFormInput id={inputId} type={field.type || 'text'} />
      )}
    </div>
  )
}

function getSections(fields) {
  const sections = []

  fields.forEach((field) => {
    const section = field.section || 'Información'
    if (!sections.includes(section)) sections.push(section)
  })

  return sections
}

export default function EntityForm({ definition }) {
  const sections = getSections(definition.formFields)

  return (
    <CForm>
      {sections.map((section) => (
        <CCard className="form-section shadow-sm" key={section}>
          <CCardBody>
            <h2 className="h6 mb-3">{section}</h2>
            <div className="form-grid">
              {definition.formFields
                .filter((field) => (field.section || 'Información') === section)
                .map((field) => (
                  <FormField key={field.name} field={field} />
                ))}
            </div>
          </CCardBody>
        </CCard>
      ))}

      {definition.route === 'ventas' && (
        <CCard className="form-section shadow-sm">
          <CCardBody>
            <InvoiceLinesEditor />
          </CCardBody>
        </CCard>
      )}

      <div className="form-actions">
        <CButton as={Link} color="secondary" variant="outline" to={`/${definition.route}`}>
          Cancelar
        </CButton>
        <CButton type="button" color="primary" disabled>
          Guardar
        </CButton>
      </div>
    </CForm>
  )
}
