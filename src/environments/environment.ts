export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '5001',
    endpoints: {
      toutesLesBieres: '/api/beer',
      uneBiere: '/api/beer/:id'
    }
  }
};
