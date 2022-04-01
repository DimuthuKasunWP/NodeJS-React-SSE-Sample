# NodeJs ReactJs Sample Application with Server Sent Events

This is a sample application implemented using  Node.js and React to demonstrate how to implement server sent events. 

## Prerequisites
* Node.js
* React with hooks

## Setup & Run the backend


```
cd backend
yarn install / npm install
yarn start / npm start
```

## Setup & Run the frontend
```shell
cd frontend
yarn install / npm install
yarn start / npm start
```


## Test
Send a POST request to the route [http://localhost:3001/message](http://localhost:3001/donate) with the following body:
```json
{
  "message": "this is the first message"
}
```

After sending the request to the backend , you will see the frontend being update automatically!
