(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("NotificationSocket", NotificationSocket);

    NotificationSocket.$inject = ["TopicRegistry", "uriHelper"];

    function NotificationSocket(TopicRegistry, uriHelper) {
        /**
         * @constructor
         * @param {string} url
         * @param {object} queryKeyVals
         */
        var constructor = function(url, queryKeyVals) {
            this.url = url;
            this.qs = uriHelper.composeQSFromKeyValues(queryKeyVals);

            this.divider = [">", "+"];
            this.registry = new TopicRegistry(this.divider);
            this.socket = new WebSocket(uriHelper.composeURI(this.url,this.qs));
            this.callbackMap = {};

            this.socket.onmessage = function(event){
                angular.forEach(this.callbackMap, function(callback){
                    callback(event.data);
                })
            }.bind(this);
        };

        /**
         * @function subscribe
         * @param {string} topic
         * @returns {number} timestamp
         */
        constructor.prototype.subscribe = function(topic, callback) {
            var key = [topic, new Date().getTime()].join(this.divider[0]);
            this.registry.replace(key, callback);
            return key;
        };

        /**
         * @function subscribe
         * @param {string} topic
         * @returns {number} topic
         */
        constructor.prototype.unsubscribe = function(topic) {
            this.registry.delete(topic);
            return topic;
        };

        /**
         * @function publish
         * @param {string} topic
         */
        constructor.prototype.publish = function (topic, message) {
            throw "[NotificationSocket] :: not implemented";
        };

        constructor.prototype.subscribe = function (subscriberCallback) {
            if(!angular.isFunction(subscriberCallback))
                return;
            var id = Date.now();
            this.callbackMap[id] = subscriberCallback;
            return id;
        };

        constructor.prototype.unsubscribe = function (subscriberId) {
            delete this.callbackMap[subscriberId];
        };

        return constructor;
    }
}).apply(this);
