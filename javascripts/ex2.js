function () {
	//thanks to Ivo Beckers for this example 
	var noCache = 0; //Safari and Opera
	function doYQL(YQ,community,path) {
		var URI = "http://query.yahooapis.com/v1/public/yql?&nocache=_nocache&callback=showQuotes&format=json";
		URI += ( community ) ? "&env=http://datatables.org/alltables.env" : "";
		var YQU = URI + "&q=" + YQ;
		var	old = document.getElementById('dataLoad09'),
			s = document.createElement("script");
		s.src = encodeURI(YQU).replace(/_nocache/, noCache++);
		!old ? document.body.appendChild(s) : document.body.replaceChild(s, old);
		s.id = 'dataLoad09';
	}
	var symbols = ["^n225","^hsi","^gdaxi","^fchi","^ftse","^dji","^ixic"].sort().join('","');
	var YQL_QUERY = 'select symbol, Name, Change, LastTradePriceOnly from yahoo.finance.quotes where symbol in ("'+symbols+'")';
	var WI = {
		"template":"table.indices",
		"header": {
			"column":[ "symbol","name","change", "percent", "price" ]
		},
		"directivehead": {
			"th": {
				"c<-column": {
					".":"c"
				}
			},
			'td':{
				"c<-column":{
					"@class":"c"
				}
			}
		},
		"directivebody": {
			"tbody tr": {
				"q<-quote":{
					"td.symbol":"q.symbol",
					"td.name":"q.Name",
					"td.change":"q.Change",
					"td.percent":function(a){
						return Math.floor(parseFloat(a.item.Change) / parseFloat(a.item.LastTradePriceOnly) * 1000000) / 10000 + ' %';
					},
					"td.price":"q.LastTradePriceOnly",
					"td@class+":function(a){
						return (/^-/).test(a.item.Change) ? ' red' : ' green';
					}
				}
			}
		}
	};

	var TEMPLATE = $p( WI.template ).render( WI.header, WI.directivehead ).compile( WI.directivebody );

	doYQL(YQL_QUERY,true,null);

	window.showQuotes = function(data){
		var PAYLOAD = data.query.results;
		$p('table.indices').render( PAYLOAD, TEMPLATE );
		window._to10 = setTimeout(function(){
			doYQL(YQL_QUERY,true,null);
		}, 10000);
	};
}

