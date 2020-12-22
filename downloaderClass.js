const request = require('request');
const async = require('async');
const fs = require('fs');
const ProgressBar = require('progress');

class Downloader {
    constructor(baseURL) {
        this.baseURL = baseURL;
        const that = this;

        this.q = async.queue(
            (input, cb) => {
                that.singleFile(input, cb);
            }, 1);

        // assign a callback
        this.q.drain(function() {
            console.log('all items have been processed');
        });

        // assign an error callback
        this.q.error(function(err, task) {
            console.error('task experienced an error', task);
        });
    }

    downloadFiles(links) {
        for (let link of links) {
            this.q.push(link);
        }
    }

    singleFile(link, cb) {
        console.log(link);
        let file = request(`${this.baseURL}${link}`);
        let bar;

        file.on('response', (res) => {
            const len = parseInt(res.headers['content-length'], 10);
            
            bar = new ProgressBar('  Downloading [:bar] :rate/bps :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: len
            });

            file.on('data', (chunk) => {
                bar.tick(chunk.length);
            })

            file.on('end', () => {
                console.log('\n');
                cb();
            })
        })
        file.pipe(
          fs.createWriteStream(
            './images/'
            + link
          )
        )
    }
}

module.exports = Downloader;