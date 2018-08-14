# IMDB Crawler

A node library to gets Movie and Tv Series  info from IMDB and returns collected data as a json

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

No need any prerequisites

### Installing

```
npm i hi-imdb-crawler
```

## Options 
### Default options

```javascript
{
    'movie': {
        'imdb_id': {
            'container': "meta[property='pageId']",
            'attr' : "content",
            'type' : "String"
        },
        'name': {
            'container': ".title_wrapper > h1[itemprop='name']",
            'attr': false,
            'type': 'String'
        },
        'directors': {
            'container': "span[itemprop='director'] > a > span[itemprop='name']",
            'attr': false,
            'type': 'String|Array'
        },
        'creators': {
            'container': "span[itemprop='creator'] > a > span[itemprop='name']",
            'attr': false,
            'type': 'String|Array'
        },
        'description': {
            'container': ".summary_text",
            'attr': false,
            'type': 'String'
        },
        'original_title': {
            'container': ".originalTitle",
            'attr': false,
            'type': 'String'
        },
        'duration': {
            'container': ".title_wrapper .subtext time[itemprop='duration']",
            'attr': false,
            'type': 'String'
        },
        'rating': {
            'container': "span[itemprop='ratingValue']",
            'attr': false,
            'type': 'String|Float'
        },
        'image': {
            'container': "meta[property='og:image']",
            'attr': 'content',
            'type': 'Image'
        },
        'genres': {
            'container': "div[itemprop='genre'] a",
            'attr': false,
            'type': 'String|Array'
        },
    },

    'series': {
        'imdb_id': {
            'container': "meta[property='pageId']",
            'attr' : "content",
            'type' : "String"
        },
        'name': {
            'container': ".title_wrapper > h1[itemprop='name']",
            'attr': false,
            'type': 'String'
        },
        'creators': {
            'container': "span[itemprop='creator'] > a > span[itemprop='name']",
            'attr': false,
            'type': 'String|Array'
        },
        'description': {
            'container': ".summary_text",
            'attr': false,
            'type': 'String'
        },
        'original_title': {
            'container': ".originalTitle",
            'attr': false,
            'type': 'String'
        },
        'duration': {
            'container': ".title_wrapper .subtext time[itemprop='duration']",
            'attr': false,
            'type': 'String'
        },
        'rating': {
            'container': "span[itemprop='ratingValue']",
            'attr': false,
            'type': 'String|Float'
        },
        'image': {
            'container': "meta[property='og:image']",
            'attr': 'content',
            'type': 'Image'
        },
        'genres': {
            'container': "div[itemprop='genre'] a",
            'attr': false,
            'type': 'String|Array'
        }
    },
    'seasons': {
        'name': {
            'container': "div.seasons-and-year-nav div>a[href*='?season=']",
            'attr': false,
            'type': 'String'
        },
        'episode_url': {
            'container': "div.list.detail.eplist > .list_item a[itemprop='name'] ",
            'attr': 'href',
            'type': 'String'
        }
    },
    'episodes': {
        'imdb_id': {
            'container': "meta[property='pageId']",
            'attr' : "content",
            'type' : "String"
        },
        'season': {
            'container': "div.bp_item > .bp_content > .bp_description > .bp_heading",
            'attr' : false,
            'type' : "String|Split",
            'action' : 'split(" ")[1]'
        },
        'name': {
            'container': ".title_wrapper > h1[itemprop='name']",
            'attr': false,
            'type': 'String'
        },
        'directors': {
            'container': "span[itemprop='director'] > a > span[itemprop='name']",
            'attr': false,
            'type': 'String|Array'
        },
        'creators': {
            'container': "span[itemprop='creator'] > a > span[itemprop='name']",
            'attr': false,
            'type': 'String|Array'
        },
        'description': {
            'container': ".summary_text",
            'attr': false,
            'type': 'String'
        },
        'original_title': {
            'container': ".originalTitle",
            'attr': false,
            'type': 'String'
        },
        'duration': {
            'container': ".title_wrapper .subtext time[itemprop='duration']",
            'attr': false,
            'type': 'String'
        },
        'rating': {
            'container': "span[itemprop='ratingValue']",
            'attr': false,
            'type': 'String|Float'
        },
        'image': {
            'container': "meta[property='og:image']",
            'attr': 'content',
            'type': 'Image'
        },
        'genres': {
            'container': "div[itemprop='genre'] a",
            'attr': false,
            'type': 'String|Array'
        },
    },
}
```

These options are against imdb site updates. So you can basicly change 
which tag to use for getting the content. The extractor will try to extract 
the content from the options you passed.

to change an default options you should pass your own options as params
while creating new instance of ImdbCrawler 
```javascript
const ImdbCrawler = require('hi-imdb-crawler');

let options = {
'movie': {
        'imdb_id': {
            'container': "meta[property='imdbId']",
            'attr' : "content",
            'type' : "String"
        },
        'name': {
            'container': ".title_wrapper > h2[itemprop='name']",
            'attr': false,
            'type': 'String'
        }
    },
'series': {
        'rating': {
            'container': "span[itemprop='rating']",
            'attr': false,
            'type': 'String|Float'
        }
    }
    
}

let imdb_code = "tt4227538";
let imdbCrawler = new ImdbCrawler(imdb_code,options);

imdbCrawler.getEpisode(function(data) {
    console.log(data);
});
```

## Usage

### to get an episode
```javascript
const ImdbCrawler = require('hi-imdb-crawler');

let imdb_code = "tt4227538";
let imdbCrawler = new ImdbCrawler(imdb_code);

imdbCrawler.getEpisode(function(data) {
    console.log(data);
});
```

### to get an movie
```javascript
const ImdbCrawler = require('hi-imdb-crawler');

let imdb_code = "tt0110413";
let imdbCrawler = new ImdbCrawler(imdb_code);

imdbCrawler.getMovie(function(data) {
    console.log(data);
});
```

### to get an series

There is an option to get series with or without episodes.
If you want to get with episodes basicly pass <code>true</code> param after callback function in <code>getSeries</code>

#### without episodes
```javascript
const ImdbCrawler = require('hi-imdb-crawler');

let imdb_code = "tt4574334";
let imdbCrawler = new ImdbCrawler(imdb_code);

imdbCrawler.getSeries(function(data) {
    console.log(data);
});
```

#### with episodes
```javascript
const ImdbCrawler = require('hi-imdb-crawler');

let imdb_code = "tt4574334";
let imdbCrawler = new ImdbCrawler(imdb_code);

imdbCrawler.getSeries(function(data) {
    console.log(data);
},true);
```
## Running the tests

```javascript
npm test
```

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [https://www.gnu.org/licenses/gpl-3.0.html](GNU GENERAL PUBLIC LICENSE) for details
