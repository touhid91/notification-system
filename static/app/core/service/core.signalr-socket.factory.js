(function() {

    var module = angular.module("app.core");

    module.factory("SignalrSocket", SignalrSocket);

    SignalrSocket.$inject = ["signalrSocketHelper", "$q", "Registry", "CONSTANT", "TopicGenerator"];

    function SignalrSocket(signalrSocketHelper, $q, Registry, CONSTANT, TopicGenerator) {
        function constructor(url, queryKeyVals) {
            this.url = url;
            this.queryKeyVals = queryKeyVals;
            this.callbackMap = new Registry(CONSTANT.SEPERATOR);
            this.topicGenerator = new TopicGenerator(CONSTANT.SEPERATOR);

            if (!this.queryKeyVals.hasOwnProperty("connectionData"))
                throw "[SignalrSocket] :: undefined connectionData in argument queryKeyVals";

            this.translator = signalrSocketHelper.payloadParser(JSON.parse(this.queryKeyVals["connectionData"])[0].name)
        };

        constructor.prototype.create = function(token) {
            var deferral = $q.defer();
            signalrSocketHelper.negotiate(this.url + "Authorization=" + token || "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOiIyMDBERTc5Qi1EQ0NELTQ5NjUtQkM5My0wQTZBOEU2QUUzNTUiLCJzdWIiOiI3YmZkYzU1NC0zYzMzLTRhNDAtYTA2OC05NThlMTVlMDNlOWUiLCJzaXRlX2lkIjoiRUU3ODU5MkQtNTI3Qy00NDhBLTlCNjQtRThDNzI3MUNDMDA4Iiwib3JpZ2luIjoiZGV2LnNlbGlzZS5iaXoiLCJzZXNzaW9uX2lkIjoiODBlMmU5MzI4M2QwNDZlNDlhMDg4MzY4YThhNWNkY2EiLCJ1c2VyX2lkIjoiN2JmZGM1NTQtM2MzMy00YTQwLWEwNjgtOTU4ZTE1ZTAzZTllIiwiZGlzcGxheV9uYW1lIjoiTWQuIEFidWwgS2FzaW0iLCJzaXRlX25hbWUiOiJKYW1haG9vayBUZWFtIiwidXNlcl9uYW1lIjoiYWJ1bC5rYXNpbUBzZWxpc2UuY2giLCJ1bmlxdWVfbmFtZSI6IjdiZmRjNTU0LTNjMzMtNGE0MC1hMDY4LTk1OGUxNWUwM2U5ZSIsInJvbGUiOlsiYXBwdXNlciIsImFwcHVzZXIiXSwiaXNzIjoiaHR0cDovL3NlbGlzZS5jaCIsImF1ZCI6IioiLCJleHAiOjE0NzI4MjA2MTIsIm5iZiI6MTQ3MDIyODYxMn0.8v3-BBN_Z-DKk3yMg-mzlsloOjtswe-2-J78oMY4CzA")
                .then(function(response) {
                    this.ws = new WebSocket(signalrSocketHelper.createWSUrl(this.url, this.queryKeyVals, response.data));
                    this.ws.onmessage = function(event) {
                        var callback = this.callbackMap.peek(
                            this.topicGenerator.generate(signalrSocketHelper.deserialize(event.data)));
                        if (callback)
                            callback();
                    }.bind(this);

                    deferral.resolve();
                }.bind(this));
        };

        constructor.prototype.publish = function(message) {
            throw "not implemented";
        };

        /**
         * @function subscribe
         * @description subscribes to targeted entity detail
         * @author touhid.alam <tua@selise.ch>
         * @param  {object}   aggregateRoot
         * @param  {function} callback
         * @return {string}   subscriptionId
         */
        constructor.prototype.subscribe = function(aggregateRoot, callback) {
            if (!this.ws)
                throw "WebSocket not initialized. use create() to initialize the socket object";

            var topic = this.topicGenerator.generate(
                topicGeneratorModelAdapter.normalize(
                    aggregateRoot.context,
                    aggregateRoot.entityName,
                    aggregateRoot.id,
                    aggregateRoot.action));
            var key = [topic, Date.now()].join(CONSTANT.SEPERATOR[0]);

            this.callbackMap.replace(key, callback);

            var data = signalrSocketHelper.payloadParser.serialize(topicGeneratorModelAdapter.parse(aggregateRoot));

            this.ws.send(this.translator.serialize("Subscribe", JSON.stringify(data)));

            return key;
        };


        constructor.prototype.unsubscribe = function(subscriptionId) {
            this.callbackMap.delete(subscriptionId);
            this.ws.send(this.translator.serialize("Unsubcribe", JSON.stringify(undefined)));
        };

        return constructor;
    }

})
.apply(this);
