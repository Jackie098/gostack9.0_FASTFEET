module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('delivery_problems', [
      {
        delivery_id: 1,
        description: 'O beneficiário não se encontra em casa',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        delivery_id: 3,
        description: 'A encomenda foi danificada. O beneficiário não aceitou',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
