const tenants = [
  {
    name: 'Loading',
    logo: '/statics/imagotype.svg',
    email: 'mauroluna.dev@gmail.com',
    hosts: [],
    favicon: '/statics/favicon.svg',
    host: '',
  },
  {
    name: 'Ecosystem',
    logo: '/statics/imagotype.svg',
    email: 'mauroluna.dev@gmail.com',
    hosts: ['localhost:3000', 'store.ecosystem.com.ar', 'store-ecosystem.verce.app', 'menu.ecosystem.com.ar'],
    favicon: '/statics/favicon.svg',
    host: '',
  },
  {
    name: 'NumeQR',
    logo: '/statics/imagotype.svg',
    email: 'mauroluna.dev@gmail.com',
    hosts: ['numeqr.com'],
    favicon: '/statics/favicon.svg',
    host: '',
  },
]

const getLocation = () => typeof window !== 'undefined' && window.location.host ? window.location.host : '';

export function useTenant() {
  const host = getLocation();

  const tenant = tenants.find(tenant => tenant.hosts.includes(host));

  return tenant ? { ...tenant, host } : tenants[0];
}