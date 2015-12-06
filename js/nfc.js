'use strict';

var webSocket = new WebSocket('ws://colocolo.mybluemix.net/ws/nfc');
var nfcList = {
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff80': { index: 1, clean: 23 },
    '4ffffffdaffffff80ffffff82ffffffeb2bffffff80': { index: 2, clean: 0 },
    '4fffffffcffffff80ffffff82ffffffeb2bffffff80': { index: 3, clean: 10 },
    '4ffffffb77fffffff82ffffffeb2bffffff80': { index: 4, clean: 16 },
    '4ffffffbbffffff80ffffff82ffffffeb2bffffff80': { index: 5, clean: 0 },
    '4ffffffbcffffff80ffffff82ffffffeb2bffffff80': { index: 6, clean: 63 },
    '4ffffffd67fffffff82ffffffeb2bffffff80': { index: 7, clean: 0 },
    '41a7fffffff82ffffffeb2bffffff81': { index: 8, clean: 34 },
    '4ffffffd57fffffff82ffffffeb2bffffff80': { index: 9, clean: 0 },
    '4fffffff87fffffff82ffffffeb2bffffff80': { index: 10, clean: 0 }
};

var getColor = function getColor(key) {
    var clean = nfcList[key]['clean'];
    var blue = Math.max(255 - clean, 148);
    var yellow = Math.max(0, 403 - Math.max(clean, 148));
    console.info("rgb(255," + yellow + "," + blue + ")");
    return "rgb(255," + yellow + "," + blue + ")";
};

$(function () {
    var placeElems = $(".col p");

    for (var key in nfcList) {
        var index = nfcList[key]['index'];
        var color = getColor(key);
        placeElems.eq(index).css("background-color", color);
     }

    webSocket.onmessage = function (event) {
        var nfcID = event.data;
        var nfcInfo = nfcList[nfcID];

        if (nfcInfo == null) {
            return null;
        }

        // setup Color
        nfcInfo['clean'] += 20;
        var index = nfcInfo['index'];
        var color = getColor(nfcID);
        placeElems.eq(index).css("background-color", color);
    };

    $("p").click(function() {
	$(this).getIndex();
	
    });

    $("h1").click(function () {
        for (var key in nfcList) {
            nfcList[key]['clean'] = 0;
            // setup Color
            var index = nfcList[key]['index'];
            var color = getColor(key);
            placeElems.eq(index).css("background-color", color);
        }
    });
});
