import { runMiddleware, corsMiddleware } from "../../../utils/middleware"

const BACKEND_URL = process.env.BACKEND_URL
const NOSTR_PUBKEY = process.env.NOSTR_PUBKEY

export default async function handler(req, res) {
    await runMiddleware(req, res, corsMiddleware);

    const { slug } = req.query

    if (!slug || slug === 'undefined') {
        res.status(404).json({ error: 'Not found' })
        return
    }

    if (slug === 'austin') {
        const metadata = [
            ["text/plain", "Austin's lnurlp endpoint, CHEERS!"]
        ];

        res.status(200).json({
            callback: `${BACKEND_URL}/api/callback/austin`,
            maxSendable: 10000000000,
            minSendable: 1000,
            metadata: JSON.stringify(metadata),
            tag: 'payRequest',
            allowsNostr: true,
            nostrPubkey: NOSTR_PUBKEY
        })
        return
    }
}
