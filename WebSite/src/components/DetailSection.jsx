import { CCard, CCardBody } from '@coreui/react'
import { fieldLabels } from '../config/fieldLabels'

export default function DetailSection({ title, fields }) {
  return (
    <CCard className="detail-card shadow-sm h-100">
      <CCardBody>
        <h2 className="h6 mb-3">{title}</h2>
        <dl className="detail-list mb-0">
          {fields.map((field) => (
            <div key={field}>
              <dt>{fieldLabels[field] || field}</dt>
              <dd>—</dd>
            </div>
          ))}
        </dl>
      </CCardBody>
    </CCard>
  )
}
