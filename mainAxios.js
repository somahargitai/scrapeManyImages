const archive = 'https://letterformarchive.org/uploads/';
const axios = require('axios');
const cheerio = require('cheerio');
const Downloader = require('./downloaderClass');

const printExtension = (fileName) => {
  if(fileName.includes(".")){
    const extension = fileName.split(".")[1];
    console.log(extension);
  }
}

const mainFunction = async () => {
  await axios
    .get(archive)
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const links = $('a');
      const linkarr = [];
      $(links).each(function (i, link) {
        // console.log($(link).text() + ':\n  ' + $(link).attr('href'));
        const item = $(link).attr('href');
        linkarr.push(item);
      });
      console.log('start download');
      console.log(linkarr.length)
      const onlyLinks = linkarr.slice(6, linkarr.length - 1)
      const dl = new Downloader(archive);
      dl.downloadFiles(onlyLinks);
    })
    .catch((error) => {
      console.log('UPS');
      console.log(error);
    });
};

mainFunction();
