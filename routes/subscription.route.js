import Router from 'express';

const SubscriptionRoute = Router();

SubscriptionRoute.get('/');

SubscriptionRoute.get('/:id');

SubscriptionRoute.post('/', (req, res) => res.send({title : 'creates subscription'}));

SubscriptionRoute.put('/:id', (req, res) => res.send({title : 'updates subscription'}));

SubscriptionRoute.delete('/:id', (req, res) => res.send({title : 'deletes subscription'}));

SubscriptionRoute.get('/user/:id', (req, res) => res.send({title : 'GETS subscriptions of user id'}));

SubscriptionRoute.put('/:id/cancel', (req, res) => res.send({title : 'Cancel subscription'}));

SubscriptionRoute.get('/upcoming-renewals', (req, res) => res.send({title : 'GETS upcoming renewals'}));

export default SubscriptionRoute;
