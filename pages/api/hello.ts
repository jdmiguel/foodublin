// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: any, res: any) => {
  console.log(req);
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
