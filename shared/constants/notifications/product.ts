export const PRODUCT = {
  PRODUCT_CREATION_PENDING: {
    id: 'PRODUCT_CREATION',
    loading: true,
    title: 'Creando Producto',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  PRODUCT_CREATION_SUCCESS: {
    id: 'PRODUCT_CREATION',
    loading: false,
    title: 'Producto creado!',
    message: 'Tu producto fue creado con éxito.',
    autoClose: 3000,
  },
  PRODUCT_CREATION_FAILED: {
    id: 'PRODUCT_CREATION',
    loading: false,
    title: 'No pudimos crear tu producto',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: false,
    color: 'red',
  },

  PRODUCT_UPDATE_PENDING: {
    id: 'PRODUCT_UPDATE',
    loading: true,
    title: 'Actualizando Producto',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  PRODUCT_UPDATE_SUCCESS: {
    id: 'PRODUCT_UPDATE',
    loading: false,
    title: 'Producto actualizado!',
    message: 'Tu producto fue actualizado con éxito.',
    autoClose: 3000,
  },
  PRODUCT_UPDATE_FAILED: {
    id: 'PRODUCT_UPDATE',
    loading: false,
    title: 'No pudimos actualizar tu producto',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: false,
    color: 'red',
  },

  PRODUCT_DELETE_PENDING: {
    id: 'PRODUCT_DELETE',
    loading: true,
    title: 'Eliminando Producto',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  PRODUCT_DELETE_SUCCESS: {
    id: 'PRODUCT_DELETE',
    loading: false,
    title: 'Producto eliminado!',
    message: 'Tu producto fue eliminado con éxito.',
    autoClose: 3000,
  },
  PRODUCT_DELETE_FAILED: {
    id: 'PRODUCT_DELETE',
    loading: false,
    title: 'No pudimos eliminar tu producto',
    message: 'Inténtalo más tarde y si el problema continúa, contáctanos.',
    autoClose: false,
    color: 'red',
  },
};