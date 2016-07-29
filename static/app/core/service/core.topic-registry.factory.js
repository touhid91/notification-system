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

            constructor.prototype._step = function(keys, registry) {
                if (undefined !== keys[0] && "" !== keys[0])
                    return this._step(
                        keys.slice(1),
                        registry[keys[0]]);
                return registry;
            };

            // constructor.prototype._step = function(keyChain, registry) {
            //     var keys = keyChain.split(this.splitter);
            //     if (undefined !== keyChain && "" !== keyChain)
            //         return this._step(
            //             keys.slice(1).join(this.splitter),
            //             registry[keys[0]]);
            //     return registry;
            // };

            // constructor.prototype._stepWValue = function(keyChain, registry, value) {
            //     var keys = keyChain.split(this.splitter);
            //     if (undefined !== keyChain && "" !== keyChain)
            //         return this._step(
            //             keys.slice(1).join(this.splitter),
            //             registry[keys[0]],
            //             value);
            //     return registry;
            // };

            // var a = new constructor();
            // a.registry = {
            //     a: {
            //         b: {
            //             c: 1
            //         }
            //     }
            // };

            // a._step("a/b");

            constructor.prototype.get = function(keyChain) {
                return this._step(keyChain.split(this.splitter), this.registry);
            };

            constructor.prototype.set = function(keyChain, value) {

            }

            return this.registry;
        };

        return constructor;
    }

}).apply(this);
