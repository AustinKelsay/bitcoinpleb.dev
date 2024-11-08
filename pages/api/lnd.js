import axios from "axios";
import { finalizeEvent } from 'nostr-tools/pure';
import { SimplePool } from 'nostr-tools/pool';
import { Redis } from '@upstash/redis'

const LND_HOST = process.env.LND_HOST;
const LND_MACAROON = process.env.LND_MACAROON;
const NOSTR_PRIVKEY = process.env.NOSTR_PRIVKEY;
const BACKEND_URL = process.env.BACKEND_URL;

// Replace kv import with Upstash Redis client initialization
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
    try {
        const response = await axios.post(`https://${LND_HOST}/v1/invoices`, {
            value: req.body.amount,
            description_hash: req.body.description_hash,
        }, {
            headers: {
                'Grpc-Metadata-macaroon': LND_MACAROON,
            }
        });

        const invoice = response.data.payment_request;
        const expiry = response.data.expiry;
        const paymentHash = Buffer.from(response.data.r_hash, 'base64');
        const paymentHashHex = paymentHash.toString('hex');

        // If this is a zap, publish a zap receipt
        if (req.body.zap_request) {
            const zapRequest = JSON.parse(req.body.zap_request);
            const verifyUrl = `${BACKEND_URL}/api/verify/${paymentHashHex}`;

            // Replace kv.set with redis.set
            await redis.set(`invoice:${paymentHashHex}`, {
                verifyUrl,
                zapRequest,
                invoice,
                settled: false
            }, { ex: expiry || 86400 });
        }

        res.status(200).json({ invoice, verify: `${BACKEND_URL}/api/verify/${paymentHashHex}` });
    } catch (error) {
        console.error('Error (server) fetching data from LND:', error.message);
        res.status(500).json({ message: 'Error fetching data' });
    }
}