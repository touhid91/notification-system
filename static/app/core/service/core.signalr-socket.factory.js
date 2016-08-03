(function() {

    var module = angular.module("app.core");

    module.factory("SignalrSocket", SignalrSocket);

    SignalrSocket.$inject = ["Socket"];

    function SignalrSocket(Socket) {
        function constructor(url, queryKeyVals) {
            Socket.apply(this, arguments);
        }

        constructor.prototype = new Socket();

        constructor.prototype.subscribe = function(object, callback) {
            throw "not implemented";
        };
    }

})
.apply(this);
