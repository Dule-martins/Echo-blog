module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      '9f1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef',
      'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdea',
      'b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef01',
      'c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0123',
    ]),
  },
});
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
