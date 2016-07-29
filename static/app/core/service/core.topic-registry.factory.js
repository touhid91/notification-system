(function() {
        "use strict";

        var moudle = angular.module("app.core");

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
                registry = _getInitializedHeapIfNotObject(registry);

                if (undefined === keys[0] || "" === keys[0])
                    return value;

                if (keys[0].indexOf(this.itemSplitter) > -1) {
                    debugger;
                    var siblings = keys[0].split(this.itemSplitter);
                    for (var i = 0; i < siblings.length; i++) {
                        registry[siblings[i]] = _getInitializedHeapIfNotObject(registry[siblings[i]]);
                        registry[siblings[i]] = value;
                    }
                } else {
                    registry[keys[0]] = this._stepWValue(
                        keys.slice(1),
                        registry[keys[0]],
                        value);
                }

                return registry;

                function _getInitializedHeapIfNotObject(heap) {
                    return (heap === null || typeof heap === "number") && {} || heap || {};
                }
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
            }

            return this.registry;
        };

        return constructor;
    }

}).apply(this);
