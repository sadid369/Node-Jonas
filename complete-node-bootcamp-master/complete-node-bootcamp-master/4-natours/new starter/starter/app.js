const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: `Hello from server side`, app: 'Natours' });
});
app.post('/', (req, res) => {
  res.send(`Post in this URL`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port at ${PORT}`);
});
