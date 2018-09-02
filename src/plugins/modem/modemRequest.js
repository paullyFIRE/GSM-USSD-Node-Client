import { encode, decode } from './convertPDU';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const ser = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
});

ser.on('error', function(err) {
  console.log('Error: ', err.message);
});

const parser = ser.pipe(new Readline({ delimiter: '\r\n' }));

const closeUSSD = () => {
  console.log('Closing Dialog.');
  ser.write(Buffer.from('AT+CUSD=2\r'));
};

const sendUSSD = code => {
  console.log('Sending code: ', code);
  const message = Buffer.from('AT+CUSD=1,"' + encode(code) + '",15\r');
  ser.write(message, err => {
    if (err) console.log('Error on write: ', err);
  });
};

const request = async code =>
  new Promise((resolve, reject) => {
    parser.on('data', resp => {
      console.log('resp: ', resp);

      if (resp === '+CUSD: 2') {
        console.log('Connection closed by remote');
        resolve({
          request: code,
          response: 'Connection closed by remote.'
        });
      } else if (resp.length >= 5) {
        const response = decode(resp.split('"')[1]);
        console.log(`Response: ${response}`);
        resolve({
          request: code,
          response
        });
      }
    });

    sendUSSD(code.toString().trim());
  });

const processRequest = async requestPath => {
  console.log('requestPath: ', requestPath);
  console.log('Starting to run modem process');
  const responsePath = [];

  for await (const ussdCode of requestPath) {
    console.log('ussdCode: ', ussdCode);
    const req = await request(ussdCode);
    responsePath.push({ ...req });
  }

  parser.on('data', null);
  await closeUSSD();

  return responsePath;
};

export { processRequest };
