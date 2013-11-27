(function() {
  var ready, renderArticle, renderData;

  renderArticle = function(index, article) {
    var directive;
    directive = {
      '.id': 'id',
      '.content': 'content',
      '.pub_date': 'pub_date',
      '.title': 'title'
      '.update_date': 'update_date'
      '.evergreen': 'evergreen'
      '.content_type': 'content_type'
      '.export_phase': 'export_phase'
      '.industry': 'industry'
      '.topic': 'topic'
      '.subtopic': 'subtopic'
      '.trade_region': 'trade_region'
      '.geo_region': 'geo_region'
      '.geo_subregion': 'geo_subregion'
      '.country': 'country'
      '.keyword': 'keyword'
      
    };
    $("#article-" + index).render(article, directive);
    return $("#article-" + index).show();
  };

  renderData = function(data) {
    var articles, article, i, _i, _len, _results;
    articles = data.results;
    _results = [];
    for (i = _i = 0, _len = articles.length; _i < _len; i = ++_i) {
      article = articles[i];
      _results.push(renderArticle(i + 1, article));
    }
    return _results;
  };

  ready = function() {
    var url;
    url = 'http://api.trade.gov/trade_articles/search?callback=?';
    return $.getJSON(url, renderData);
  };

  $(document).ready(ready);

}).call(this);
