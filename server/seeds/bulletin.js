
exports.seed = function(knex, Promise) {
  return knex('bulletin').del()
    .then(function () {
      const messages = [{
        title: 'This is the first message',
        description: 'This is the first body message',
        date: new Date(),
      },
      {
        title: 'This is the second message',
        description: 'This is the second body message',
        date: new Date(),
      }
    ];
    return knex('bulletin').insert(messages);
    });
};



//title- text
//description - text
//done(delete) - boolean
//date - datetime
