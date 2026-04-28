// Vercel サーバーレス関数
// APIキーはここで使う。ブラウザからは見えない。

const CONTRACT_ADDRESS = '0xb0748c9372b12a89b36d58effba4f388ab4beb2c';
const CHAIN            = process.env.CHAIN || 'eth-mainnet';

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' });

    const { wallet, pageKey } = req.query;

    // ウォレットアドレス検証
    if (!wallet) {
        return res.status(400).json({ error: 'wallet パラメータが必要です' });
    }
    if (!/^0x[0-9a-fA-F]{40}$/.test(wallet)) {
        return res.status(400).json({ error: '無効なウォレットアドレス形式です' });
    }

    const apiKey = process.env.ALCHEMY_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'サーバーのAPIキーが未設定です（Vercel環境変数を確認してください）' });
    }

    const params = new URLSearchParams({
        owner:                  wallet,
        'contractAddresses[]':  CONTRACT_ADDRESS,
        withMetadata:           'true',
        pageSize:               '100',
    });
    if (pageKey) params.set('pageKey', pageKey);

    try {
        const url      = `https://${CHAIN}.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?${params}`;
        const upstream = await fetch(url);
        const data     = await upstream.json();

        if (!upstream.ok) {
            return res.status(upstream.status).json({
                error: data?.error?.message || 'Alchemy APIエラー',
            });
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
