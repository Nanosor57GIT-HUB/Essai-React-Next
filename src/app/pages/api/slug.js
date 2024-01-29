

export default function handler(req, res) {
    res.writeHead(307, { Location: '/accueil' });
    res.end();
  }
  