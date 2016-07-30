(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("connectionFactory", constructor);

    constructor.$inject = [];

    function constructor() {
        /**
         * @function create
         * @arg {string} context
         * @returns a new instance of WebSocket
         */
        this.create = function(context) {
            switch (context) {
                case "ecap.pds":
                    //TODO split into seperate service
                    var protocol = "ws",
                        transport = "webSockets",
                        endPoint = "172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/signalr/connect",
                        connectionToken = "fXB%2Fy8%2FPlY%2B5HXQV2GfuSvmjcWpUXj6iH11CmT424OVO%2B%2Bnue44njGzxWpsuKIDehgfja2BRjRZhtrb4y%2BlF%2F6kbXcHQHHtoOPSDRJAh%2Bmkvfe4COn%2FYrYv%2FLhgeatzO",
                        userId = "2494b8a1-5153-481f-9393-53595f53084b",
                        tenantId = "fa17992a-1490-4796-aad7-4651fac517c2",
                        connectionData = [{
                            "name": "notifierserverhub"
                        }],
                        url = protocol + "://" + endPoint +
                        "?transport=" + transport +
                        "&connectionToken=" + connectionToken +
                        "&UserId=" + userId +
                        "&TenantId=" + tenantId +
                        "&connectionData=" + encodeURIComponent(JSON.stringify(connectionData)) +
                        "&tid=1";

                    var connection = new WebSocket(url);
                    connection.onopen = function() {
                        console.info("onopen");
                    };

                    connection.onclose = function() {
                        console.info("onclose");
                    };

                    connection.onerror = function() {
                        console.error("onerror");
                    };

                    return connection;
            }
        }
    }

}).apply(this);
