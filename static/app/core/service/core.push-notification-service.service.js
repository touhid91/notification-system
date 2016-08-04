(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("pushNotificationService", constructor);

    constructor.$inject = ["Socket", "SignalrSocket"];

    function constructor(Socket, SignalrSocket) {
        /**
         * @function createSocket
         * @param {string} url
         * @param {object} queryKeyVals
         * @returns new instance of Socket
         */
        this.createSocket = function(url, queryKeyVals) {
            return new Socket(url, queryKeyVals);
        };

        /**
         * @function createSignalrSocket
         * @param {string} url
         * @param {object} queryKeyVals
         * @returns new instance of SignalrSocket
         */
        this.createSignalrSocket = function(url, queryKeyVals) {
            return new SignalrSocket(url, queryKeyVals);
        };


    }

})
.apply(this);
