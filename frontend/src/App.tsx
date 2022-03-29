import React, { useEffect, useState } from 'react';

type MessageObj = {
  messages: string[];
  amount: number;
};

const App = () => {
  const [messageObj, setMessages] = useState<MessageObj>({ messages: [], amount: 0 });

  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/dashboard`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      const data: MessageObj = JSON.parse(e.data);

      setMessages(data);
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{textAlign:'center'}}>
      <h1>Message Dashboard</h1>
      <hr/>
      <h3> Messages :  </h3>
      
      {messageObj.messages.map((message, i) => <p>{message}</p>)}
      <h3>Total Messages: {messageObj.amount}</h3>
    </div>
  );
}

export default App;
