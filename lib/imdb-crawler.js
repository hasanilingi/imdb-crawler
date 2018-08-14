const Config = require('./../config/config')
const Crawler = require('crawler')
const _ = require('lodash');

class ImdbCrawler {
    constructor(imdbId,options) {
        this.imdb_id = imdbId;
        this.config = Config;
        this.extend(this.config,options,true)
        this.content;
    }

    getMovie(callback) {
        let request = new Crawler({
            maxConnections: 10,
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                } else if (res.statusCode === 404) {
                    return console.log('Invalid title')
                } else {
                    let $ = res.$
                    let movie = {};
                    movie = this.extractor(movie, this.config.movie, $)
                    this.content = movie;
                }
                done()
            }
        })

        request.queue('http://www.imdb.com/title/' + this.imdb_id)

        request.on('drain', () => {
            callback(this.content)
        })

    }

    getSeries(callback, withEpisodes = false) {
        let episodes = []
        let request = new Crawler({
            maxConnections: 10,
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                } else if (res.statusCode === 404) {
                    return console.log('Invalid title')
                } else {
                    let $ = res.$
                    let seasonURLs = []
                    seasonURLs = $(this.config.seasons.name.container)
                        .toArray()
                        .map(el => $(el).attr('href'));

                    let series = {};

                    series = this.extractor(series, this.config.series, $)
                    if (withEpisodes) {
                        series.seasons = []
                        if (seasonURLs.length !== 0) {
                            seasonURLs.forEach(url => {
                                seasonCrawler.queue('http://www.imdb.com/' + url)
                            })
                        }
                    }


                    this.content = series;
                }
                done()
            }
        })

        request.queue('http://www.imdb.com/title/' + this.imdb_id)

        const seasonCrawler = new Crawler({
            maxConnections: 10,
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                } else {
                    let $ = res.$
                    let episodesUrl = []
                    episodesUrl = $(this.config.seasons.episode_url.container)
                        .toArray()
                        .map(el => $(el).attr('href'));
                    if (episodesUrl.length !== 0) {
                        episodesUrl.forEach(url => {
                            episodeCrawler.queue({url: 'http://www.imdb.com/title/' + url.split("/")[2]})
                        });
                    }
                }
                done()
            }
        })

        let episodeCrawler = new Crawler({
            maxConnections: 10,
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                } else if (res.statusCode === 404) {
                    return console.log('Invalid title')
                } else {
                    let $ = res.$

                    let episode = {};
                    episodes.push(this.extractor(episode, this.config.episodes, $))
                }
                done()
            }
        })

        if (withEpisodes === true) {
            episodeCrawler.on('drain', () => {
                episodes.forEach((el, i) => {
                    if (typeof this.content.seasons === 'undefined') {
                        this.content.seasons = []
                    }
                    if (typeof this.content.seasons[el.season] === 'undefined') {
                        let season = Object.assign({}, {'name': el.season, 'episodes': _.concat([], el)})
                        this.content.seasons[el.season] = season;

                    } else {
                        this.content.seasons[el.season].episodes.push(el)
                    }
                })

                callback(this.content)
            })
        } else {
            request.on('drain', () => {
                callback(this.content)
            })
        }


    }

    getEpisode(callback) {
        let request = new Crawler({
            maxConnections: 10,
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                } else if (res.statusCode === 404) {
                    return console.log('Invalid title')
                } else {
                    let $ = res.$
                    let seasonURLs = []
                    seasonURLs = $(this.config.seasons.name.container)
                        .toArray()
                        .map(el => $(el).attr('href'));

                    let episode = {};

                    episode = this.extractor(episode, this.config.episodes, $)
                    this.content = episode;
                }
                done()
            }
        })

        request.queue('http://www.imdb.com/title/' + this.imdb_id)

        request.on('drain', () => {
            callback(this.content)
        })

    }

    extractor(object, placeholder, $) {
        _.forEach(placeholder, (element, index) => {
            if (element.type === "String") {
                if (element.attr !== false) {
                    object[index] = $(element.container).attr(element.attr)
                } else {
                    object[index] = $(element.container).text().trim()
                }
            } else if (element.type === "String|Array") {
                object[index] = []
                $(element.container).each((i, el) => {
                    object[index][i] = ($(el).text().trim())
                })
            } else if (element.type === "String|Split") {
                let text = $(element.container).text().trim()
                text = eval("text." + element.action)
                object[index] = text
            } else if (element.type === "String|Float") {
                if (element.attr !== false) {
                    object[index] = parseFloat($(element.container).attr(element.attr))
                } else {
                    object[index] = parseFloat($(element.container).text().trim())
                }
            } else if (element.type === "Image") {
                if (element.attr !== false) {
                    object[index] = $(element.container).attr(element.attr)
                }

            }
        })

        return object;
    }

    extend (first, second, extendNested) {
        let cr = this;
        _.forEach(second, (val,prop) =>  {
            if (extendNested && cr.isObject(val)) {
                if (first[prop] === undefined) {
                    first[prop] = {};
                }
                cr.extend(first[prop], val, true);
            } else {
                first[prop] = val;
            }
        });
        return first;
    };

    isObject (variable) {
        return variable && !variable.nodeType && Object.prototype.toString.call(variable) === "[object Object]";
    };
}

module.exports = ImdbCrawler
