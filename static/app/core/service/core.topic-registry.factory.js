(function() {
    "use strict";

    var moudle = angular.module("app.core");

    module.factory("TopicRegistry", TopicRegistry);

    function TopicRegistry() {
        var constructor = function() {
            this.splitter = "/";
            this.registry = {

            };
        };

        constructor.prototype.get = function(keyChain) {
            var keys = keyChain.split(this.splitter);
            for (var i = 0; i < keys.length; i++)
                var head = head ? head[keys[i]] : this.registry[keys[i]];
            return head;
        };

        constructor.prototype.set = function(keyChain, value) {
            var keys = keyChain.split(this.splitter);
            for (var i = 0; i < keys.length; i++) {
                var head = head ? head[keys[i]] : this.registry[keys[i]];

                //TODO
                if (typeof this.registry[keys[i]] !== "object" || typeof this.registry[keys[i]] !== "undefined")
                    throw "unexpected end of tree";

                if (i === keys.length - 1)
                    this.registry[keys[i]] = value;
            }

            return this.registry;
        };

        return constructor;
    }

}).apply(this);
