(function() {
        "use strict";

        var moudle = angular.module("app.core");

        module.factory("TopicRegistry", TopicRegistry);

        function TopicRegistry() {
            var constructor = function(splitter) {
                this.splitter = splitter || "/";
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
                registry = registry || {};

                if (undefined === keys[0] || "" === keys[0])
                    return value;

                registry[keys[0]] = this._stepWValue(
                    keys.slice(1),
                    registry[keys[0]],
                    value);

                return registry;
            };

            constructor.prototype.get = function(keyChain) {
                return this._step(keyChain.split(this.splitter), this.registry);
            };

            constructor.prototype.set = function(keyChain, value) {
                return this._stepWValue(keyChain.split(this.splitter), this.registry, value);
            }

            return this.registry;
        };

        return constructor;
    }

}).apply(this);
