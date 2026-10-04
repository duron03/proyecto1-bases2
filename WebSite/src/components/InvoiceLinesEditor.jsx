import { CButton, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'

export default function InvoiceLinesEditor() {
  return (
    <div className="invoice-lines">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <div>
          <h3 className="h6 mb-1">Detalle de factura</h3>
          <p className="small text-body-secondary mb-0">
            Diseño de los campos que tendrá cada línea.
          </p>
        </div>
        <CButton type="button" color="primary" variant="outline" size="sm" disabled>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar línea
        </CButton>
      </div>

      <div className="invoice-line">
        <div>
          <CFormLabel htmlFor="line-product">Producto</CFormLabel>
          <CFormSelect id="line-product" defaultValue="">
            <option value="">Seleccione…</option>
          </CFormSelect>
        </div>
        <div>
          <CFormLabel htmlFor="line-quantity">Cantidad</CFormLabel>
          <CFormInput id="line-quantity" type="number" />
        </div>
        <div>
          <CFormLabel htmlFor="line-price">Precio unitario</CFormLabel>
          <CFormInput id="line-price" type="number" />
        </div>
        <div>
          <CFormLabel htmlFor="line-tax">Impuesto (%)</CFormLabel>
          <CFormInput id="line-tax" type="number" />
        </div>
        <div className="invoice-line-total">
          <span className="small text-body-secondary">Total</span>
          <strong>—</strong>
        </div>
        <CButton type="button" color="danger" variant="ghost" disabled>
          <CIcon icon={cilTrash} />
        </CButton>
      </div>
    </div>
  )
}
