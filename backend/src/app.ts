import express, { Request, Response } from 'express';
import cors from 'cors';

const messageObj = {
  messages : [] as any,
  amount: 0
};

const app = express();

app.use(express.json());
app.use(cors());

app.post('/message', (req, res) => {
  const message = req.body.message || "";

  if (message.length > 0) {
    messageObj.messages.push(message);
    messageObj.amount += 1;
  }

  return res.json({ message: 'Message Recieved ! 🙂'});
});

const SEND_INTERVAL = 2000;

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(messageObj));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify(messageObj));
};

app.get('/dashboard', (req: Request, res: Response) => {
  if (req.headers.accept === 'text/event-stream') {
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
});

app.listen(3001, () => {
  console.log(`Application started !`);
});
