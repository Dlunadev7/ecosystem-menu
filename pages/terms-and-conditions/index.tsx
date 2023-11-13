import { Title, Text, Container, Space } from "@mantine/core";

export default function TermsAndConditionsScreen() {
  return (
    <Container px={16} py={132}>
      <Title>Términos y Condiciones de Ecosystem Store:</Title>
      <Space h={24} />
      <Text>
        Bienvenide a Ecosystem Store, una plataforma de menú digital que permite a los usuarios ver y seleccionar opciones de menú de diferentes establecimientos de servicio de alimentos y bebidas. Antes de utilizar nuestra plataforma, lea cuidadosamente estos Términos y Condiciones, ya que rigen su uso de nuestra plataforma. Al utilizar nuestra plataforma, acepta estos Términos y Condiciones.
      </Text>
      <Space h={32} />
      <Title order={3}>Uso de la plataforma</Title>
      <Space h={16} />
      <Text ta="justify">
        Ecosystem Store le otorga una licencia limitada, no exclusiva e intransferible para acceder y utilizar nuestra plataforma de acuerdo con estos Términos y Condiciones. Usted acepta utilizar nuestra plataforma solo con fines legales y de acuerdo con todas las leyes y regulaciones aplicables.
      </Text>
      <Space h={32} />
      <Title order={3}>Registro y cuentas</Title>
      <Space h={16} />
      <Text ta="justify">
        Para utilizar ciertas características de nuestra plataforma, es posible que necesite registrarse y crear una cuenta. Al hacerlo, acepta proporcionar información precisa y completa y mantener su información de cuenta actualizada en todo momento. Usted es responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran bajo su cuenta.
      </Text>
      <Space h={32} />
      <Title order={3}>Propiedad intelectual</Title>
      <Space h={16} />
      <Text ta="justify">
        Ecosystem Store y su contenido están protegidos por las leyes de propiedad intelectual aplicables. Usted acepta no copiar, distribuir, modificar, crear obras derivadas o utilizar nuestro contenido de cualquier manera sin nuestro permiso previo por escrito.
      </Text>
      <Space h={32} />
      <Title order={3}>Contenido de terceros</Title>
      <Space h={16} />
      <Text ta="justify">
        Nuestra plataforma puede incluir contenido de terceros, como publicidad, enlaces a sitios web de terceros y contenido generado por usuarios. No tenemos control sobre el contenido de terceros y no somos responsables de su precisión, integridad o legalidad.
      </Text>
      <Space h={32} />
      <Title order={3}>Exclusión de responsabilidad</Title>
      <Space h={16} />
      <Text ta="justify">
        Ecosystem Store opera bajo marca blanca y no se hace responsable de ninguna contingencia que pueda surgir entre la plataforma y el proveedor de servicios que el usuario haya contratado. No nos hacemos responsables del contenido multimedia que se promocione y/o comercialice en nuestra plataforma.
      </Text>
      <Space h={32} />
      <Title order={3}>Modificaciones</Title>
      <Space h={16} />
      <Text ta="justify">
        Nos reservamos el derecho de modificar o suspender nuestra plataforma o cualquier parte de ella, así como estos Términos y Condiciones, en cualquier momento y sin previo aviso.
      </Text>
      <Space h={32} />
      <Title order={3}>Resolución del contrato</Title>
      <Space h={16} />
      <Text ta="justify">
        Podemos cancelar o suspender su cuenta y su acceso a nuestra plataforma en cualquier momento y por cualquier motivo sin previo aviso. Si incumple estos Términos y Condiciones, podemos tomar medidas legales apropiadas
      </Text>
      <Space h={32} />
      <Title order={3}>Ley aplicable y jurisdicción</Title>
      <Space h={16} />
      <Text ta="justify">
        Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de Argentina. Cualquier disputa relacionada con estos Términos y Condiciones se someterá a la jurisdicción exclusiva de los tribunales de Argentina.
      </Text>
      <Text ta="justify">
        Si tiene alguna pregunta sobre estos Términos y Condiciones, puede comunicarse con nosotros a través de nuestra página de contacto en ecosystem.com.ar.
      </Text>
    </Container>
  )
}