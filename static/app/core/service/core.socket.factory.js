(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("Socket", Socket);

    Socket.$inject = ["Registry", "uriHelper", "constant"];

    function Socket(Registry, uriHelper, constant) {
        /**
         * @constructor
         * @param {string} url
         * @param {object} queryKeyVals
         */
        var constructor = function(url, queryKeyVals) {
            this.registry = new Registry(constant.seperator);
            this.socket = new WebSocket(uriHelper.composeURI(url, uriHelper.composeQSFromKeyValues(queryKeyVals)));
            this.callbackMap = [];

            this.socket.onmessage = function(event) {
                angular.forEach(this.callbackMap, function(callback) {
                    callback(event.data);
                })
            }.bind(this);
        };

        /**
         * @function publish
         * @param {string|object} message
         */
        constructor.prototype.publish = function(message) {
            var payload = angular.isString(message) ? message : JSON.stringify(message);
            this.socket.send(payload);
        };

        /**
         * @function subscribe
         * @param {function} subscriberCallback
         * @returns {number} subscriptionid
         */
        constructor.prototype.subscribe = function(subscriberCallback) {
            if (!this instanceof constructor)
                throw "function must be overridden";

            if (!angular.isFunction(subscriberCallback))
                return;

            var id = Date.now();
            this.callbackMap[id] = subscriberCallback;
            return id;
        };

        /**
         * @function unsubscribe
         * @param {number} subscriberId
         * @returns {boolean} deletestatus
         */
        constructor.prototype.unsubscribe = function(subscriberId) {
            delete this.callbackMap[subscriberId];
        };

        return constructor;
    }
})
.apply(this);
