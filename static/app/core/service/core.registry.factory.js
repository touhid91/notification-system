(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("Registry", Registry);

    Registry.$inject = ["HeapOperationHelper"];

    function Registry(HeapOperationHelper) {
        /**
         * @constructor
         * @param {linear array} divider
         */
        var constructor = function(divider) {
            if (!divider)
                throw "[Registry] :: divider must be defined";

            this.divider = divider;
            this.heap = {};
            this.heapHelper = new HeapOperationHelper(divider);
        };

        constructor.prototype.peek = function(keyChain) {
            return this.heapHelper.peek(
                keyChain.split(this.divider[0]),
                this.heap);
        };

        constructor.prototype.replace = function(keyChain, value) {
            return this.heapHelper.replace(
                keyChain.split(this.divider[0]),
                this.heap,
                value);
        };

        constructor.prototype.delete = function(keyChain) {
            if (keyChain.indexOf(this.divider[0]) === -1)
                throw "[Registry] :: argument keyChain must have one leaf node";

            var parent = keyChain.substring(0, keyChain.lastIndexOf(this.divider[0])),
                tail = keyChain.slice(keyChain.lastIndexOf(this.divider[0]) + 1);
            return this.heapHelper.delete(parent.split(this.divider[0]), tail, this.heap);
        };

        return constructor;
    }

}).apply(this);
