module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('recipients', [
      {
        name: 'Carlos Augusto M.',
        street: 'Rua Padre Reis',
        number: 1193,
        complement: null,
        state: 'PI',
        city: 'Floriano',
        cep: '64800-00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Adenilson Pereira',
        street: 'Rua Davi Caldas',
        number: 878,
        complement: 'Próximo ao bar do zequinha',
        state: 'PI',
        city: 'Floriano',
        cep: '64800-00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Matheus Silva Oliveira',
        street: 'Rua Oka Lobo',
        number: 345,
        complement: null,
        state: 'PI',
        city: 'Floriano',
        cep: '64800-00',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
