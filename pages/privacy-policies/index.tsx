import { Title, Text, Container, Space } from "@mantine/core";

export default function PrivacyPoliciesScreen() {
  return (
    <Container px={16} py={132}>
      <Title>Política de privacidad de Ecosystem Store</Title>
      <Space h={24} />
      <Text>
        Bienvenide a Ecosystem Store, una plataforma de menú digital que permite a los usuarios ver y seleccionar opciones de menú de diferentes establecimientos de servicio de alimentos y bebidas. En Ecosystem Store, valoramos su privacidad y nos comprometemos a protegerla. Esta política de privacidad explica cómo recopilamos, usamos, protegemos y compartimos su información personal cuando utiliza nuestra plataforma. Al utilizar nuestra plataforma, acepta esta política de privacidad.
      </Text>
      <Space h={32} />
      <Title order={3}>Información que recopilamos:</Title>
      <Space h={16} />
      <Text ta="justify">
        Recopilamos información personal que nos proporciona, como su nombre, dirección de correo electrónico, número de teléfono y ubicación. También podemos recopilar información sobre su dispositivo, como su dirección IP, el tipo de navegador que está utilizando, la hora y fecha de acceso y otra información de seguimiento similar. Podemos recopilar información adicional si accede a nuestra plataforma a través de una cuenta de redes sociales o una cuenta de terceros, como un proveedor de servicios de pago.
      </Text>
      <Space h={32} />
      <Title order={3}>Cómo usamos su información:</Title>
      <Space h={16} />
      <Text ta="justify">
        Usamos su información personal para proporcionarle una experiencia personalizada y mejorar nuestros servicios, como responder a sus preguntas y comentarios, procesar sus pedidos, brindarle asistencia técnica y enviarle actualizaciones y promociones relacionadas con nuestros servicios. También podemos usar su información para fines publicitarios y de investigación de mercado.
      </Text>
      <Space h={32} />
      <Title order={3}>Cómo protegemos su información:</Title>
      <Space h={16} />
      <Text ta="justify">
        Tomamos medidas de seguridad razonables para proteger su información personal contra pérdida, mal uso y acceso no autorizado, alteración o divulgación. Utilizamos medidas de seguridad técnicas y administrativas, como firewalls, cifrado y controles de acceso, para proteger su información.
      </Text>
      <Space h={32} />
      <Title order={3}>Compartir su información:</Title>
      <Space h={16} />
      <Text ta="justify">
        No compartimos su información personal con terceros, excepto cuando sea necesario para prestarle servicios, como procesar su pedido y entregar sus productos, o cuando sea requerido por ley o reglamento.
      </Text>
      <Space h={32} />
      <Title order={3}>Exclusión de responsabilidad:</Title>
      <Space h={16} />
      <Text ta="justify">
        Ecosystem Store opera bajo marca blanca y no se hace responsable de ninguna contingencia que pueda surgir entre la plataforma y el proveedor de servicios que el usuario haya contratado. No nos hacemos responsables del contenido multimedia que se promocione y/o comercialice en nuestra plataforma.
      </Text>
      <Space h={32} />
      <Title order={3}>Cambios en esta política de privacidad:</Title>
      <Space h={16} />
      <Text ta="justify">
        Podemos actualizar esta política de privacidad en cualquier momento y sin previo aviso. La versión más actualizada de esta política de privacidad se publicará en nuestra plataforma y será efectiva desde el momento en que se publique.
      </Text>
      <Text ta="justify">
        Si tiene alguna pregunta sobre esta política de privacidad, puede comunicarse con nosotros a través de nuestra página de contacto en ecosystem.com.ar.
      </Text>
    </Container>
  )
}