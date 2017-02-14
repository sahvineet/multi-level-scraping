var request = require('request');
var cheerio = require('cheerio');


function loadData2() {
    var url = 'http://www.xxxxxxxxxxx.html';
    console.log('---requesting html page----------');
    request(url, function(error2, response2, html2) {
        var metadata = {};
        if (!error2 && response2.statusCode == 200) {
            var $ = cheerio.load(html2);
            var table = $('.responsive-table tbody');
            trs = table.find('tr');
            trs.each(function(i, e) {
                var tds=$(this).find('td');
                var metadata = {};
                metadata.tournament = $(this).find('th span a').text();
                metadata.date = tds.eq(0).text();
                metadata.ageGroup = tds.eq(1).find('span strong').text();
                metadata.location = tds.eq(2).find('span strong').text();
                metadata.status = tds.eq(3).find('strong span span').text();
                metadata.url = url;
                console.log(metadata);
            });
        }
    })
}


function loadData(callback) {
    console.log('---lequesting html page----------');
    request('http://xxxxxxxxxxx-xx1.com', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('div table.footable.table tbody').each(function(i, element) {
                var trs = $(this).find('tr');
                trs.each(function(i2, tr) {
                    var tds = $(this).find('td');
                    var link = tds.eq(4).find('div.pull-left').last().find('a').attr('href');

                    var url = 'http://xxxxxxxxxxx-xx1.com/2xxx/' + link;
                    request(url, function(error2, response2, html2) {
                        if (!error2 && response2.statusCode == 200) {
                            var metadata = {};
                            var $2 = cheerio.load(html2);
                            var table = $2('div.TopBot table');
                            trs = table.find('tr');
                            metadata.date = trs.eq(0).find('td').eq(1).text();
                            metadata.location = trs.eq(1).find('td').eq(1).text();
                            metadata.primaryComplex = trs.eq(2).find('td').eq(1).text();
                            metadata.ageDivision = trs.eq(3).find('td').eq(1).text();
                            metadata.ageCutoff = trs.eq(4).find('td').eq(1).text();
                            metadata.tournamentFormat = trs.eq(5).find('td').eq(1).text();
                            metadata.gameGuaranteed = trs.eq(6).find('td').eq(1).text();
                            metadata.entryFee = trs.eq(7).find('td').eq(1).find('strong').text();
                            metadata.ruleAndPolicy = trs.eq(9).find('td').eq(1).find('a').attr('href');
                            metadata.awards = trs.eq(10).find('td').eq(1).text();
                            metadata.url = url;
                            console.log(metadata);
                        }
                    })

                })
            });
        }
    });
}

loadData();
loadData2();
