export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '5001',
    endpoints: {
      toutesLesBieres: '/api/Beer',
      uneBiere: '/api/Beer/:id'
    }
  }
};
