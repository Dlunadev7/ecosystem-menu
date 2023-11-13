export const INVITATION = {
  CREATE_INVITATION_SUCCESS: {
    id: 'CREATE_INVITATION_SUCCESS',
    loading: false,
    title: 'Invitación enviada!',
    message: 'El plazo para aceptar la invitación vence en una semana.',
    autoClose: false,
    color: "green"
  },
  CREATE_INVITATION_FAILED: {
    id: 'CREATE_INVITATION_FAILED',
    loading: false,
    title: 'No pudimos enviar la invitación',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: 3000,
    color: 'red',
  },
  CANCEL_INVITATION_PENDING: {
    id: 'CANCEL_INVITATION',
    loading: true,
    title: 'Cancelando invitación',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  CANCEL_INVITATION_SUCCESS: {
    id: 'CANCEL_INVITATION',
    loading: false,
    title: 'Invitación cancelada con éxito',
    message: '',
    autoClose: false,
    color: "green"
  },
  CANCEL_INVITATION_FAILED: {
    id: 'CANCEL_INVITATION',
    loading: false,
    title: 'No pudimos cancelar la invitación',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: 3000,
    color: 'red',
  },
  ACCEPT_INVITATION_PENDING: {
    id: 'ACCEPT_INVITATION',
    loading: true,
    title: 'Aceptando invitación',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  ACCEPT_INVITATION_SUCCESS: {
    id: 'ACCEPT_INVITATION',
    loading: false,
    title: 'Invitación aceptada con éxito',
    message: '',
    autoClose: false,
    color: "green"
  },
  ACCEPT_INVITATION_FAILED: {
    id: 'ACCEPT_INVITATION',
    loading: false,
    title: 'No pudimos aceptar la invitación',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: 3000,
    color: 'red',
  },
};