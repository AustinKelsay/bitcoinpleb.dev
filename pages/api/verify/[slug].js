import axios from "axios";

const LND_HOST = process.env.LND_HOST;
const LND_MACAROON = process.env.LND_MACAROON;

export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        if (slug !== "austin") {
            res.status(200).json({
                status: "ERROR",
                reason: "Lightning address not found"
            });
            return;
        }

        // Call LND to check payment status
        const response = await axios.get(
            `https://${LND_HOST}/v1/invoice/${slug}`,
            {
                headers: {
                    'Grpc-Metadata-macaroon': LND_MACAROON,
                }
            }
        );

        // According to LUD-21 spec, we should return:
        // - { status: "OK", settled: true, preimage: "123456...", pr: "lnbc10..." }
        // - { status: "OK", settled: false, preimage: null, pr: "lnbc10..." }
        // - { status: "ERROR", reason: "error message" }
        if (response.data) {
            const isSettled = response.data.state === "SETTLED";
            res.status(200).json({
                status: "OK",
                settled: isSettled,
                preimage: isSettled && response.data.r_preimage ?
                    Buffer.from(response.data.r_preimage, 'base64').toString('hex') :
                    null,
                pr: response.data.payment_request
            });
        } else {
            res.status(200).json({
                status: "ERROR",
                reason: "Invoice not found"
            });
        }

    } catch (error) {
        console.error('Error verifying payment:', error.message);
        res.status(200).json({
            status: "ERROR",
            reason: error.message || "Error verifying payment"
        });
    }
}
