const expect = require('chai').expect

const ImdbCrawler = require('../index')
const imdbSeriesId = 'tt0475784'
const imdbEpisodeId = 'tt4227538'
const imdbMovieId = 'tt0110413'

let imdbCrawlerForSeries = new ImdbCrawler(imdbSeriesId)
let imdbCrawlerForEpisode = new ImdbCrawler(imdbEpisodeId)
let imdbCrawlerForMovie = new ImdbCrawler(imdbMovieId)

describe('#getEpisode', function () {
    this.timeout(30000)
    let episode = null

    before(function (done) {
        imdbCrawlerForEpisode.getEpisode(function (data) {
            episode = data;
            done()
        })
    })

    it('should get title name', function () {
        expect(episode.name).to.equal('The Original')
    })

    it('should get creators', function () {
        expect(episode.creators).to.eql(['Jonathan Nolan', 'Lisa Joy', 'Kilter Films', 'Bad Robot', 'Jerry Weintraub Productions'])
    })

    it('should get genres', function () {
        expect(episode.genres).to.eql(['Drama', 'Mystery', 'Sci-Fi', 'Western'])
    })

    it('should get rating', function () {
        expect(episode.rating).to.equal(8.8)
    })

    it('should get image', function () {
        expect(episode.image).to.have.string('http')
        expect(episode.image).to.match(/.(jpg|jpeg|png|gif)$/i)
    })
});
describe('#getSeries', function () {
    this.timeout(30000)
    let series = null

    before(function (done) {
        imdbCrawlerForSeries.getSeries(function (data) {
            series = data;
            done()
        })
    })

    it('should get title name', function () {
        expect(series.name).to.equal('Westworld')
    })

    it('should get creators', function () {
        expect(series.creators).to.eql(["Bad Robot", "Jerry Weintraub Productions", "Kilter Films"])
    })

    it('should get genres', function () {
        expect(series.genres).to.eql(['Drama', 'Mystery', 'Sci-Fi', 'Western'])
    })

    it('should get rating', function () {
        expect(series.rating).to.equal(8.9)
    })

    it('should get image', function () {
        expect(series.image).to.have.string('http')
        expect(series.image).to.match(/.(jpg|jpeg|png|gif)$/i)
    })
});

describe('#getMovie', function () {
    this.timeout(30000)
    let movie = null

    before(function (done) {
        imdbCrawlerForMovie.getMovie(function (data) {
            movie = data;
            done()
        })
    })

    it('should get title name', function () {
        expect(movie.name).to.equal('Léon (1994)')
    })

    it('should get directors', function () {
        expect(movie.directors).to.eql(["Luc Besson"])
    })

    it('should get creators', function () {
        expect(movie.creators).to.eql(["Luc Besson", "Gaumont", "Les Films du Dauphin"])
    })

    it('should get genres', function () {
        expect(movie.genres).to.eql(["Crime", "Drama", "Thriller"])
    })

    it('should get rating', function () {
        expect(movie.rating).to.equal(8.6)
    })

    it('should get image', function () {
        expect(movie.image).to.have.string('http')
        expect(movie.image).to.match(/.(jpg|jpeg|png|gif)$/i)
    })


});