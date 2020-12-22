const archive = 'https://letterformarchive.org/uploads/';
const request = require('request');
const cheerio = require('cheerio');
const Downloader = require('./downloaderClass');

const printExtension = (fileName) => {
  if (fileName.includes('.')) {
    const extension = fileName.split('.')[1];
    console.log(extension);
  }
};

const mainFunction = async () => {
  request(archive, (err, res, body) => {
    const $ = cheerio.load(body);
    const links = $('a');
    const linkarr = [];
    $(links).each(function (i, link) {
      const item = $(link).attr('href');
      linkarr.push(item);
    });
    console.log('start download');
    console.log(linkarr.length);
    const onlyLinks = linkarr.slice(6, linkarr.length - 1)
    console.log(linkarr);
    const dl = new Downloader(archive);
    dl.downloadFiles(onlyLinks);

  });
};

mainFunction();
