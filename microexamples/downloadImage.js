'use strict';

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

module.exports = async (baseUrl, fileName, outputLocationPath) => {
  console.log(`downloading ${fileName}`);
  const path = Path.resolve(__dirname, outputLocationPath, fileName);
  const url = `${baseUrl}${fileName}`;

  const response = await Axios({
    method:'GET',
    url: url,
    responseType: 'stream',
  });

  response.data.pipe(
    Fs.createWriteStream(path)
  );

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    })
    response.data.on('error', (err) => {
      console.log('Error occured on downloading image');
      reject(err);
    })
  })
}
