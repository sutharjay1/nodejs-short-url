import URL from '../model/urlModel.js';
import { nanoid } from 'nanoid';

async function handleGenerateNewShortUrl(req, res) {
  const generateShortID = nanoid(8);
  const body = req.body;

  if (!body.url)
    return res.status(400).json({
      status: 'fail',
      message: 'url is required',
    });

  await URL.create({
    shortID: generateShortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.status(201).render('home', { shortID: generateShortID });
  // .json({
  //   status: 'success',
  //   shortID: generateShortID,
  // })
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });

  res.json({
    totalVisit: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

export { handleGenerateNewShortUrl, handleGetAnalytics };
