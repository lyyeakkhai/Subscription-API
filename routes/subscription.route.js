import Router from 'express';
import { getSubscriptions, getSubscription, createSubscription } from '../controllers/subscription.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const SubscriptionRoute = Router();


SubscriptionRoute.get('/', authMiddleware, getSubscriptions);

SubscriptionRoute.get('/users/:id', authMiddleware, getSubscription);

SubscriptionRoute.post('/', authMiddleware, createSubscription);

SubscriptionRoute.put('/:id', (req, res) => res.send({title : 'updates subscription'}));

SubscriptionRoute.delete('/:id', (req, res) => res.send({title : 'deletes subscription'}));

SubscriptionRoute.get('/users/:id', (req, res) => res.send({title : 'GETS subscriptions of user id'}));

SubscriptionRoute.put('/:id/cancel', (req, res) => res.send({title : 'Cancel subscription'}));

SubscriptionRoute.get('/upcoming-renewals', (req, res) => res.send({title : 'GETS upcoming renewals'}));

export default SubscriptionRoute;
