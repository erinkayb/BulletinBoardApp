const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

/* mounted at /bulletin. */
router.get('/', (req, res) => {
  knex('bulletin')
    .select()
    .then(messages => {
      res.render('all', { bulletin: messages });
    })
    })

// create new message page
router.get('/new', (req, res) => {
    res.render('new');
   })

router.get('/:id', (req, res) => {
  const id = req.params.id;
  resAndRenderMessage(id, res, 'single');
    })

function resAndRenderMessage(id, res, viewName) {
  if(typeof id != 'undefined'){
    knex('bulletin')
      .select()
      .where('id', id)
      .first()
      .then(message => {
        res.render(viewName, message);
      })
    } else {
      res.status(500);
      res.render('error', {
        message: 'Invalid id'
      });
    }
}

router.get('/:id/edit', (req, res) => {
  // get message with id in url
  const id = req.params.id;
  resAndRenderMessage(id, res, 'edit');
})

function validMessage(bulletin){
  return typeof bulletin.title == 'string' &&
      bulletin.title.trim() != '';
}

// validate the message, then insert or update, then redirect
function validateMessageIUR(req, res, callback){
  // validates here
  if(validMessage(req.body)){
    const messages = {
      title: req.body.title,
      description: req.body.description,
      // don't want to reset date every edit
    }
    callback(messages)
  } else {
    // respond with error
    res.status(500);
    res.render('error', {
      message: 'Invalid message'
    });
  }
}

router.post('/', (req, res) => {
  validateMessageIUR(req, res, (bulletin) => {
    bulletin.date = new Date();
    // insert into db
    knex('bulletin')
      .insert(bulletin, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/bulletin/${id}`)
      })
  });
    console.log(req.body);
  })

router.put('/:id', (req, res) => {
  validateMessageIUR(req, res, (bulletin) => {
    // insert into db
    knex('bulletin')
      .where('id', req.params.id)
      .update(bulletin, 'id')
      .then(() => {
        res.redirect(`/bulletin/${req.params.id}`)
      })
  });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  if(typeof id != 'undefined'){
    knex('bulletin')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/bulletin');
      })
    } else {
      res.status(500);
      res.render('error', {
        message: 'Invalid id'
      });
    }
})


module.exports = router;
