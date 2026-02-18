export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: 'Alive', 
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
}
