const handler = async (req: any, res: any) => {
  return res.status(200).json({ name: 'hello' });
};

export default handler;
