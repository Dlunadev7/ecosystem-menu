export const CATEGORY = {
  CATEGORY_CREATION_PENDING: {
    id: 'CATEGORY_CREATION',
    loading: true,
    title: 'Creando Categoría',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  CATEGORY_CREATION_SUCCESS: {
    id: 'CATEGORY_CREATION',
    loading: false,
    title: 'Categoría creada!',
    message: 'Tu categoría fue creada con éxito.',
    autoClose: 3000,
  },
  CATEGORY_CREATION_FAILED: {
    id: 'CATEGORY_CREATION',
    loading: false,
    title: 'No pudimos crear la categoría',
    message: 'Inténtalo más tarde y si el problema continúa, contacta con soporte.',
    autoClose: false,
    color: 'red',
  },
  CATEGORY_DELETE_PENDING: {
    id: 'CATEGORY_DELETE',
    loading: true,
    title: 'Eliminando Categoría',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  CATEGORY_UPDATE_PENDING: {
    id: 'CATEGORY_UPDATE',
    loading: true,
    title: 'Actualizando Categoría',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  CATEGORY_UPDATE_SUCCESS: {
    id: 'CATEGORY_UPDATE',
    loading: false,
    title: 'Categoría actualizada',
    message: 'Tu categoría fue actualizado con éxito.',
    autoClose: 3000,
  },
  CATEGORY_UPDATE_FAILED: {
    id: 'CATEGORY_UPDATE',
    loading: false,
    title: 'No pudimos actualizar tu categoría',
    message: 'Inténtalo más tarde y si el problema continúa, contacta con soporte.',
    autoClose: false,
    color: 'red',
  },
  CATEGORY_DELETE_SUCCESS: {
    id: 'CATEGORY_DELETE',
    loading: false,
    title: 'Categoría eliminada',
    message: 'Tu categoría fue eliminada con éxito.',
    autoClose: 3000,
  },
  CATEGORY_DELETE_FAILED: {
    id: 'CATEGORY_DELETE',
    loading: false,
    title: 'No pudimos eliminar tu categoría',
    message: 'Inténtalo más tarde y si el problema continúa, contacta con soporte.',
    autoClose: false,
    color: 'red',
  },
  CATEGORY_SORTED_PENDING: {
    id: 'CATEGORY_SORT',
    loading: true,
    title: 'Actualizando el orden de las Categorías',
    message: 'Estamos procesando tu pedido.',
    autoClose: false,
    withCloseButton: false
  },
  CATEGORY_SORTED_SUCCESS: {
    id: 'CATEGORY_SORT',
    loading: false,
    title: 'Reordenamos tus categorías',
    message: 'Los productos asociados a esta categoría se actualizarán progresivamente.',
    autoClose: 3000,
  },
  CATEGORY_SORTED_FAILED: {
    id: 'CATEGORY_SORT',
    loading: false,
    title: 'No pudimos ordenar tus categorías',
    message: 'Inténtalo más tarde y si el problema continúa, contacta con soporte.',
    autoClose: false,
    color: 'red',
  },
  CATEGORY_SORTED_EMPTY: {
    id: 'CATEGORY_SORT',
    loading: false,
    title: 'Sin cambios en el orden de categorías',
    message: 'No hay cambios en el orden de categorías.',
    autoClose: 3000,
  },
};