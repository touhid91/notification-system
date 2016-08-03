var express = require("express"),
    js = require("json-serializer");

/**
 * HTTP SERVER
 * 127.0.0.1:3000
 */
express()
    .use(express.static("static"))
    .listen(3000);

/**
 * WS SERVER
 * 127.0.0.1:3001
 */


var WebSocketServer = require('ws')
    .Server,
    wss = new WebSocketServer({
        port: 3001
    });

wss.on('connection', function (ws) {
    var eid;
    ws.on('message', function (message) {
        console.log('client sent ', message, "\n");
    });

    ws.on("close", function(){
        clearInterval(eid);
    })

    var payload = {
        NotificationType: "FilterSpecificReceiverType",
        UserId: "2494b8a1-5153-481f-9393-53595f53084b ",
        SubscriptionFilters: [{
            Context: "News",
            ActionName: "Update",
            Value: "60e1412a-250a-4349-b8cc-522b8fe77afb"
       }]
    };

    eid = setInterval(function() {
        ws.send(js.serialize(payload));
    }, 1000);
});
