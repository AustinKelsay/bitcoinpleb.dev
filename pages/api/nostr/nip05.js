import { runMiddleware, corsMiddleware } from "../../../utils/middleware"

const nostrData = {
    names: {
        bitcoinplebdev:
            "8172b9205247ddfe99b783320782d0312fa305a199fb2be8a3e6563e20b4f0e2",
    },
};

export default async function Nip05(req, res) {
    await runMiddleware(req, res, corsMiddleware);

    return res.status(200).json(nostrData);
}