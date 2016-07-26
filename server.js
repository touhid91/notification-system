var express = require("express"),
    js = require("json-serializer"),
    ws = require("nodejs-websocket");

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
ws.createServer(function(conn) {
    console.info("create");

    var eid;
    conn.on("close", function() {
        console.info("close");
        clearInterval(eid);
    });

    conn.on("error", function() {
        console.info("error");
        clearInterval(eid);
    });

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
        conn.send(js.serialize(payload));
    }, 1000);
}).listen(3001);
