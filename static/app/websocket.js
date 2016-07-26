(function() {
    "use strict";

    window.addEventListener("load", function() {
        var connection = new WebSocket("ws://" + window.location.hostname + ":3001");
        connection.onopen = function() {
            console.info("onopen");
        };

        connection.onclose = function() {
            console.info("onclose");
        };

        connection.onerror = function() {
            console.error("onerror");
        };

        connection.onmessage = function(event) {
            var div = document.createElement("div");
            div.style.color = ["#111", "#222", "#333", "#444", "#aaa", "#bbb", "#ccc", "#ddd", "#eee", "#fff"][parseInt(Math.random() * 10)];
            div.textContent = event.data;
            document.body.appendChild(div);
        };
    })

}).apply(this);
