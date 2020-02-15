module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('deliveries', [
      {
        recipient_id: 1,
        courier_id: 2,
        product: 'Mouse Plus Gaming x2000dpi',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipient_id: 3,
        courier_id: 4,
        product: 'game Call of Dutty II Word War',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipient_id: 2,
        courier_id: 3,
        product: 'Headset EachPlus Sorround',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipient_id: 2,
        courier_id: 1,
        product: 'Glass table with iron support',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipient_id: 1,
        courier_id: 2,
        product: 'notebook LG intel Celeron',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipient_id: 3,
        courier_id: 4,
        product: 'Smart Tv Samsung',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
