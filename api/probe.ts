export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: 'Alive', v: 2,
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
}
