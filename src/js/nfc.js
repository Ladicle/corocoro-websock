var webSocket = new WebSocket('ws://colocolo.mybluemix.net/ws/nfc');
var nfcList = {
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff80': { index: 1, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff81': { index: 2, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff82': { index: 3, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff83': { index: 4, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff84': { index: 5, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff85': { index: 6, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff86': { index: 7, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff87': { index: 8, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff88': { index: 9, clean: 0 },
    '4ffffff97ffffff80ffffff82ffffffeb2bffffff89': { index: 10, clean: 0 }
}

var getColor = function(key) {
    var clean = nfcList[key]['clean'];
    var blue = Math.max(255 - clean, 148);
    var yellow = Math.max(0, 403 - Math.max(clean, 148));
    console.info("rgb(255," + yellow + "," + blue +")")
    return "rgb(255," + yellow + "," + blue +")";
}

$(function() {
    var placeElems = $(".col p")
    

    webSocket.onmessage = function(event) {
	var nfcID = event.data
	var nfcInfo = nfcList[nfcID]

	if (nfcInfo == null) {
	    return null;
	}
	
	// setup Color
	nfcInfo['clean'] += 20;
	var index = nfcInfo['index']
	var color = getColor(nfcID)
	placeElems.eq(index).css("background-color", color);
    }

    $("h1").click(function(){
	for ( var key in nfcList ) {
	    nfcList[key]['clean'] = 0
	    // setup Color
	    var index = nfcList[key][index]
	    var color = getColor(key)
	    placeElems.eq(index).css("background-color", color);
	}
    });
});
