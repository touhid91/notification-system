(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("TopicRegistry", TopicRegistry);

    function TopicRegistry() {
        var constructor = function(rootSplitter, itemSplitter) {
            this.rootSplitter = rootSplitter || "/";
            this.itemSplitter = itemSplitter || ",";
            this.registry = {

            };
        };

        constructor.prototype._step = function(keys, registry) {
            if (undefined === keys[0] || "" === keys[0])
                return registry;

            return this._step(
                keys.slice(1),
                registry[keys[0]]);
        };

        constructor.prototype._stepWValue = function(keys, registry, value) {
            registry = null === registry || "number" === typeof registry && {} || registry || {};

            if (undefined === keys[0] || "" === keys[0])
                return value;

            else if (keys[0].indexOf(this.itemSplitter) > -1) {
                var siblings = keys[0].split(this.itemSplitter);
                for (var i = 0; i < siblings.length; i++) {
                    keys[0] = siblings[i];
                    registry[keys[0]] = this._stepWValue(
                        keys.slice(1),
                        registry[keys[0]],
                        value);
                }
            } else registry[keys[0]] = this._stepWValue(
                keys.slice(1),
                registry[keys[0]],
                value);

            return registry;
        };

        constructor.prototype.get = function(keyChain) {
            return this._step(
                keyChain.split(this.rootSplitter),
                this.registry);
        };

        constructor.prototype.set = function(keyChain, value) {
            return this._stepWValue(
                keyChain.split(this.rootSplitter),
                this.registry,
                value);
        };

        return constructor;
    }

}).apply(this);
