(function() {
    "use strict";

    window.addEventListener("load", function() {
        var connection = new WebSocket("ws://172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/signalr/connect?transport=webSockets&connectionToken=RAv%2BEinKNzK13LbOY6%2BKmukpN6w90k594EurmPH27jO0CA5jgD48K2F4YaVqbPRl3Fn7TL0L3lWp4hpKgfJhOuZi11GT2dxeSZ%2B%2FiaawNhIWSO9IrhNDe%2F9W%2F4dWucfZ&UserId=2494b8a1-5153-481f-9393-53595f53084b&TenantId=fa17992a-1490-4796-aad7-4651fac517c2&connectionData=%5B%7B%22name%22%3A%22notifierserverhub%22%7D%5D&tid=1");
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
    });

}).apply(this);
