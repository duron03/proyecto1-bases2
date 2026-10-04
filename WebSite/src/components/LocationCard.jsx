import { CCard, CCardBody } from '@coreui/react'

export default function LocationCard() {
  return (
    <CCard className="detail-card shadow-sm">
      <CCardBody>
        <h2 className="h6 mb-3">Ubicación de entrega</h2>
        <div className="location-map d-flex align-items-center justify-content-center text-body-secondary">
          El mapa se mostrará cuando exista una ubicación real.
        </div>
      </CCardBody>
    </CCard>
  )
}
