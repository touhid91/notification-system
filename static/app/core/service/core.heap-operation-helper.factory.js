(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("HeapOperationHelper", HeapOperationHelper);

    HeapOperationHelper.$inject = [];

    function HeapOperationHelper() {
        var constructor = function(divider) {
            if (!divider)
                throw "[HeapOperationHelper] :: divider must be defined";

            this.divider = divider;
        };

        constructor.prototype.peek = function(keys, heap) {
            if (undefined === keys[0] || "" === keys[0])
                return heap;

            return this.peek(
                keys.slice(1),
                heap[keys[0]]);
        };

        constructor.prototype.replace = function(keys, heap, value) {
            heap = null === heap || "number" === typeof heap && {} || heap || {};

            if (undefined === keys[0] || "" === keys[0])
                return value;

            else if (keys[0].indexOf(this.divider[1]) > -1) {
                var siblings = keys[0].split(this.divider[1]);
                for (var i = 0; i < siblings.length; i++) {
                    keys[0] = siblings[i];
                    heap[keys[0]] = this.replace(
                        keys.slice(1),
                        heap[keys[0]],
                        value);
                }
            } else heap[keys[0]] = this.replace(
                keys.slice(1),
                heap[keys[0]],
                value);

            return heap;
        };

        constructor.prototype.delete = function(keys, tail, heap) {
            if (undefined === keys[0] || "" === keys[0])
                return delete heap[tail];

            return this.delete(
                keys.slice(1),
                tail,
                heap[keys[0]]);
        };

        return constructor;
    }
}).apply(this);
