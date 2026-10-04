import { CButton } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { entities } from '../config/entities'
import PageHeader from '../components/PageHeader'
import EntityForm from '../components/EntityForm'

export default function EntityFormPage({ entityKey, mode }) {
  const definition = entities[entityKey]
  const isEditing = mode === 'edit'
  const title = isEditing
    ? `Editar ${definition.singular}`
    : `Nuevo ${definition.singular}`
  const description = isEditing
    ? `Diseño del formulario para editar un ${definition.singular}.`
    : `Diseño del formulario para registrar un ${definition.singular}.`

  const backButton = (
    <CButton as={Link} color="secondary" variant="outline" to={`/${definition.route}`}>
      <CIcon icon={cilArrowLeft} className="me-2" />
      Volver
    </CButton>
  )

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[{ label: definition.title, to: `/${definition.route}` }, { label: title }]}
        actions={backButton}
      />
      <EntityForm definition={definition} />
    </>
  )
}
