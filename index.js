
var request = require('request');

var tocheck = ["ACVICRJRMVT", "TVMRJRCIVCA", "ACVICRJRMVC", "CVMRJRCIVCA", "AC2ICRJRM3T", "T3MRJRCI2CA", "AC2ICRJRM3C", "C3MRJRCI2CA", "DR2NEAOAD3T", "T3DAOAEN2RD"]

var perm = function(str) {
  var results = [];
  var arr = str.split("");
  var len = Math.pow(arr.length, 2);

  for (var i = 0; i < len; i++) {
    for (var k = 0, j = i; k < arr.length; k++, j >>= 1) {
      arr[k] = (j & 1) ? arr[k].toUpperCase() : arr[k].toLowerCase();
    }
    var combo = arr.join("");
    results.push(combo);
  }
  return results;
}

for (var i in tocheck) {
  var comb = perm(tocheck[i]);

  for (var j in comb) {

    request('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBPWItLCjmeLDqjYdahSb73zCamS-s4ppc&part=snippet&fields=items(id,snippet(title,channelId,channelTitle))&id=' + comb[j], function(error, response, body) {
      if (response && response.statusCode == 200) {
        var data = JSON.parse(body);
        if (data.items.length)
          console.log(data.items[0].snippet.title + " " + data.items[0].id)
      } else console.log("error");

    })
  }
}
