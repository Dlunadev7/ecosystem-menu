export const AUTH = { 
  LOGIN_FAILED: {
    id: 'LOGIN_FAILED',
    title: 'No encontramos tu cuenta.',
    message: 'Parece que no estás registrado en el sistema.',
    color: 'red',
  },
  SIGN_IN_PENDING: {
    id: 'SIGN_IN',
    loading: true,
    title: 'Intentando ingresar al sistema',
    message: '',
    autoClose: false,
    color: 'dark',
  },
  SIGN_IN_SUCCESS: {
    id: 'SIGN_IN',
    loading: false,
    title: 'Ingreso exitoso',
    message: '',
    autoClose: 3000,
  },
  SIGN_IN_FAILED: {
    id: 'SIGN_IN',
    loading: false,
    color: 'red',
    title: 'Algo salió mal',
    message: 'Parece que el código no estaba bien.',
    autoClose: 3000,
  },
  SIGN_UP_FAILED: {
    id: 'SIGN_UP',
    loading: false,
    title: 'Algo salió mal',
    color: 'red',
    message: 'Intentá más tarde y si el problema continúa, contactá con soporte.',
  },
  VERIFICATION_SUCCESS: {
    id: 'VERIFICATION',
    loading: false,
    title: 'Usuario verificado con éxito',
    message: '',
    color: 'green',
    autoClose: 3000,
  },
  VERIFICATION_FAILED: {
    id: 'VERIFICATION',
    loading: false,
    title: 'No pudimos verificar el usuario',
    message: 'El link de verificación expiró, intentá registrarte de nuevo; si el problema persiste, comunícate con nosotros.',
    autoClose: false,
    color: 'red',
  },
};