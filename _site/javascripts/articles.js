  (function() {
  var ready, renderArticle, renderData;

  renderArticle = function(index, article) {
    var directive;
    directive = {
	  '.title': 'title',
	  '.pub_date': 'pub_date',
      '.content': 'content'
      
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
