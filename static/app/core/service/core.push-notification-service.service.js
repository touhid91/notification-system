(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("pushNotificationService", constructor);

    constructor.$inject = ["Socket", "$http", "uriHelper"];

    function constructor(Socket, $http, uriHelper) {
        this.signalr = {
            negotiatePath: "signalr/negotiate",
            connectPath: "signalr/connect",
            negotiate: function(serviceRoot, queryKeyVals) {
                var url = serviceRoot + this.negotiatePath;
                return $http.get(uriHelper.composeURI(url, uriHelper.composeQSFromKeyValues(queryKeyVals)));
            }
        };

        /**
         * @function decorateNotificationSocket
         * @param {string} url
         * @param {object} queryKeyVals
         * @returns new instance of NotificationSocket
         */
        this.createSocket = function(url, queryKeyVals) {
            return new Socket(url, queryKeyVals);
        }


    }

})
.apply(this);
