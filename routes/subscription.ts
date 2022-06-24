import { Router, Request, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Subscription } from '../models/subscription.model';

const webpush = require('web-push');

const subscriptionRoutes = Router();

// Crear un ubscription
subscriptionRoutes.post('', [verificaToken], (req: any, res: Response) => {

    const userId = req.usuario._id;

    const subscription = {
        userId: req.usuario._id,
        endpoint: req.body.endpoint,
        p256dh: req.body.keys.p256dh,
        auth: req.body.keys.auth
    }

    Subscription.findOne({ userId: userId }, (err: any, subsDB: any) => {
        if (subsDB) {
            Subscription.findByIdAndUpdate(subsDB._id, subscription, { new: true }, (err, upDB) => {
                res.json({
                    ok: true,
                    message: "subscription update."
                });
            });
        } else {
            Subscription.create(subscription).then(createDB => {
                res.status(201).json({
                    ok: true,
                    message: "subscription create.",
                });
            }).catch(err => {
                res.status(500).json({
                    ok: false,
                    err
                });
            });
        }
    })


});

// Enviar a todos los subscriptores un mensaje
subscriptionRoutes.post('/enviar', [verificaToken], (req: Request, res: Response) => {

    Subscription.find({}, (err: any, subscriptions: any[]) => {
        if (err) {
            res.status(500);
            throw err;
        } 

        if (subscriptions && subscriptions.length > 0) {
            subscriptions.forEach(subscription => {
                console.log("subscription",subscription);
                const vapidKeys = {
                    "publicKey": "BDoY7Ap872g9qjnRrNQeQp58HMzw-6dQ9JyLWmozepSmGUPFeTNNwqe30SXQFLs1W1sEIE1klNWU9UppOdnvpVY",
                    "privateKey": "N0SZlK1lu3k3Iub5KILJ787YUsRDuTM4rle10xWF4kc"
                }
            
                webpush.setVapidDetails(
                    'mailto:example@yourdomain.org',
                    vapidKeys.publicKey,
                    vapidKeys.privateKey
                );
            
                const pushSubscription = {
                    endpoint: subscription.endpoint,
                    keys: {
                        auth: subscription.auth,
                        p256dh: subscription.p256dh
                    }
                };
            
                const payload = {
                    "notification": {
                        "title": "PRETTY LUA",
                        "body": "Con el CODIGO lua2022 Podrás obtener un 25% de los servicios en tiendas PetShop",
                        "vibrate": [100, 50, 100],
                        "image": "https://i.postimg.cc/VNtnRMk5/promocion.jpg",
                        "actions": [{
                            "action": "explore",
                            "title": "Go to the site"
                        }]
                    }
                }
            
                webpush.sendNotification(
                    pushSubscription,
                    JSON.stringify(payload))
                    .then(console.log('Enviado !!')
                    )

            })
        }
        res.json({
            ok: true,
            data: subscriptions
        });
    })

});

export default subscriptionRoutes;