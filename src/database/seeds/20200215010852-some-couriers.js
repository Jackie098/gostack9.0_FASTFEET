module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('couriers', [
      {
        name: 'Chaylon Leal',
        email: 'chaylonLelLeu@hotmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Thalyson Eduardo Carvalho',
        email: 'thalysMantlg@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'João Victor Miranda',
        email: 'jvmira@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Simone Miranda',
        email: 'sisiMira123@outlook.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
