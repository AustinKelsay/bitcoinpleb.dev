import axios from "axios";
import crypto from "crypto";
import { runMiddleware, corsMiddleware } from "../../../utils/middleware";
import { verifyEvent } from 'nostr-tools/pure';

const BACKEND_URL = process.env.BACKEND_URL;
const NOSTR_PUBKEY = process.env.NOSTR_PUBKEY; // Your nostr public key

export default async function handler(req, res) {
    await runMiddleware(req, res, corsMiddleware);
    const { slug, ...queryParams } = req.query;

    if (slug === 'austin') {
        let zapRequest = null;
        if (queryParams.amount) {
            const amount = parseInt(queryParams.amount);
            let metadata, metadataString, hash, descriptionHash;

            if (queryParams.nostr) {
                // This is a zap request
                zapRequest = JSON.parse(decodeURIComponent(queryParams.nostr));

                // Verify the zap request
                if (!verifyEvent(zapRequest)) {
                    res.status(400).json({ error: 'Invalid zap request' });
                    return;
                }

                // Validate zap request
                if (zapRequest.kind !== 9734) {
                    res.status(400).json({ error: 'Invalid zap request' });
                    return;
                }

                metadataString = JSON.stringify(zapRequest);
                hash = crypto.createHash('sha256').update(metadataString).digest('hex');
                descriptionHash = Buffer.from(hash, 'hex').toString('base64');
            } else {
                // This is a regular lnurl-pay request
                metadata = [
                    ["text/plain", "Austin's lnurlp endpoint, CHEERS!"]
                ];
                metadataString = JSON.stringify(metadata);
                hash = crypto.createHash('sha256').update(metadataString).digest('hex');
                descriptionHash = Buffer.from(hash, 'hex').toString('base64');
            }

            // Convert amount from millisatoshis to satoshis
            const value = amount / 1000;
            if (value < 1) {
                res.status(400).json({ error: 'Amount too low' });
                return;
            } else {
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/lnd`, { amount: value, description_hash: descriptionHash, zap_request: zapRequest });
                    res.status(200).json({ pr: response.data.invoice, verify: response.data.verify });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to generate invoice' });
                }
            }
        } else {
            res.status(400).json({ error: 'Amount not specified' });
        }
    }
}