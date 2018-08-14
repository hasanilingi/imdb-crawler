module.exports = {
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
};

