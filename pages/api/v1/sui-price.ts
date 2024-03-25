import { NextApiHandler } from 'next';

import { SUI_CMC_ID } from '@/constants';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const result = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${SUI_CMC_ID}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY || '',
          },
        }
      );
      const data = await result.json();

      return res.status(200).json(data.data);
    }

    res.status(405).send('Method Not Allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
