import app from '../app';
import {
  createServer
} from 'http';

var server = createServer(app);

import {
  connect,
} from 'mongoose';


const PORT = process.env.PORT || 8100;
connect(
  'mongodb+srv://pegasi-test:8yl8Ljp3lg3z9EpN@cluster0.ezgly.mongodb.net/pegasi-test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      server.listen(PORT);
      console.log('Base de datos conectada!');
      console.log('Servidor escuchando por el puerto ' + PORT)
    }
  }
);