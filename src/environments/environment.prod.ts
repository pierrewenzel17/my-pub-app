export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '5001',
    endpoints: {
      toutesLesBieres: '/api/beer',
      toutesLesBieresParNombre: '/api/Beer',
      uneBiere: '/api/beer/:id'
    }
  }
};
