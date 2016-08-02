(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("pushNotificationService", constructor);

    constructor.$inject = ["NotificationSocket"];

    function constructor(NotificationSocket) {
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
        this.decorateNotificationSocket = function(url, queryKeyVals) {
            return new NotificationSocket(url, queryKeyVals);
        }
    }

}).apply(this);
