(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("SubscriptionManager", SubscriptionManager);

    SubscriptionManager.$inject = ["TopicRegistry"];

    function SubscriptionManager(TopicRegistry) {
        var constructor = function() {
            this.registry = new TopicRegistry();
        }

        /**
         * @function subscribe
         * @arg {string} topic
         * @returns {number} timestamp
         */
        constructor.prototype.subscribe = function(topic, callback) {
            var key = [topic, new Date().getTime()].join("/");
            this.registry.set(key, callback);
            return key;
        };

        /**
         * @function subscribe
         * @arg {string} topic
         * @returns {number} topic
         */
        constructor.prototype.unsubscribe = function(topic) {
            this.registry.set(topic, undefined);
            return topic;
        };
    }

}).apply(this);
