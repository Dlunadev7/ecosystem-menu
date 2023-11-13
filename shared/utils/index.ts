export const DEFAULT_CATEGORY = {
  id: "nemo-category",
  name: 'Sin Categoria',
  store: ''
}
export const normalization = (name: string) => name.toLowerCase().replaceAll(' ', '-')
