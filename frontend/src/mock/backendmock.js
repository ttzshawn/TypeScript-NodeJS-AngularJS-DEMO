(() => {
    const mocks = angular.module('mocks', ['ngMockE2E']);

    // Inject mocks module into mainApp (Only dev environment)
    angular.module('mainApp').requires.push('mocks');

    mocks.run(($httpBackend, coModel, moModel) => {

        // this is the creation(201) of a new resource
        $httpBackend.whenPOST('ws/login').respond((method, url, data) => {
            // var params = angular.fromJson(data);

            // var game = coModel.addOne(params);

            // get the id of the new resource to populate the Location field
            // var gameid = game.gameid;

            if (JSON.parse(data).username == 'qq') {
                return [200, { token: '23fefe23' }, {}];
            } else {
                return [401, { "code": 401, "reason": "Invalid username or password" }, {}];
            }
        });


        $httpBackend.whenGET('ws/clientorder/list').respond(coModel.getData());

        $httpBackend.whenGET('ws/marketorder').respond((method, url, data) => {
            const marketorderlist = coModel.findAll();
            return [200, marketorderlist, {}];
        });

        // this is the update of an existing resource (ngResource does not send PUT for update)
        $httpBackend.whenGET(/\/marketorder\/list\/\d+/).respond((method, url, data) => {
            // var params = angular.fromJson(data);

            // parse the matching URL to pull out the id (/games/:id)
            const moid = url.split('/')[2];

            const serverData = moModel.getData();

            return [200, serverData, {}];

            // var game = coModel.updateOne(gameid, params);

            // return [200, game, { Location: '/games/' + gameid }];
        });

        // this is the update of an existing resource (ngResource does not send PUT for update)
        $httpBackend.whenPOST(/\/marketorder\/\d+/).respond((method, url, data) => {
            const params = angular.fromJson(data);

            // parse the matching URL to pull out the id (/games/:id)
            const gameid = url.split('/')[2];

            const game = coModel.updateOne(gameid, params);

            return [400, game, { Location: `/games/${gameid}` }];
        });

        // this is the update of an existing resource (ngResource does not send PUT for update)
        $httpBackend.whenDELETE(/\/marketorder\/\d+/).respond((method, url, data) => {
            // parse the matching URL to pull out the id (/games/:id)
            const gameid = url.split('/')[2];

            coModel.deleteOne(gameid);

            return [204, {}, {}];
        });

        $httpBackend.whenGET(/html\//).passThrough();
        $httpBackend.whenGET(/js\//).passThrough();
    })


    mocks.service('coModel', function coModel() {
        this.data = [{
            "id": "031820160212500000001",
            "brokerId": "0000000010",
            "uuId": "_DDD",
            "ric": "DDD",
            "name": "3D Systems Corporation",
            "shares": 500,
            "amount": 10000,
            "type": "Buy",
            "strategy": "VWAP",
            "fills": 100,
            "totalShares": 5000,
            "totalAmount": 235000,
            "bookedOn": 1458281700000,
            "tradedOn": 1458281700000,
            "status": "Done"
        }, {
                "id": "0318201602871502130000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Processing"
            }, {
                "id": "0318222215000000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222215000900001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222215000800001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222271500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222261500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318252221500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222421500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318232221500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222221500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }, {
                "id": "0318222211500000001",
                "brokerId": "0000000010",
                "uuId": "_DDD",
                "ric": "DDD",
                "name": "3D Systems Corporation",
                "shares": 500,
                "amount": 10000,
                "type": "Buy",
                "strategy": "VWAP",
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "bookedOn": 1458281700000,
                "tradedOn": 1458281700000,
                "status": "Done"
            }];

        this.getData = function () {
            return this.data;
        };

        this.setData = function (data) {
            this.data = data;
        };

        this.findOne = function (gameid) {
            // find the game that matches that id
            const list = $.grep(this.getData(), (element, index) => element.gameid == gameid);
            if (list.length === 0) {
                return {};
            }
            // even if list contains multiple items, just return first one
            return list[0];
        };

        this.findAll = function () {
            return this.getData();
        };

        // options parameter is an object with key value pairs
        // in this simple implementation, value is limited to a single value (no arrays)
        this.findMany = function (options) {
            // find games that match all of the options
            const list = $.grep(this.getData(), (element, index) => {
                let matchAll = true;
                $.each(options, (optionKey, optionValue) => {
                    if (element[optionKey] != optionValue) {
                        matchAll = false;
                        return false;
                    }
                });
                return matchAll;
            });
        };

        // add a new data item that does not exist already
        // must compute a new unique id and backfill in
        this.addOne = function (dataItem) {
            // must calculate a unique ID to add the new data
            const newId = this.newId();
            dataItem.gameid = newId;
            this.data.push(dataItem);
            return dataItem;
        };

        // return an id to insert a new data item at
        this.newId = function () {
            // find all current ids
            const currentIds = $.map(this.getData(), dataItem => dataItem.gameid);
            // since id is numeric, and we will treat like an autoincrement field, find max
            const maxId = Math.max.apply(Math, currentIds);
            // increment by one
            return maxId + 1;
        };

        this.updateOne = function (gameid, dataItem) {
            // find the game that matches that id
            const games = this.getData();
            let match = null;
            for (let i = 0; i < games.length; i++) {
                if (games[i].gameid == gameid) {
                    match = games[i];
                    break;
                }
            }
            if (!angular.isObject(match)) {
                return {};
            }
            angular.extend(match, dataItem);
            return match;
        };

        this.deleteOne = function (gameid) {
            // find the game that matches that id
            const games = this.getData();
            let match = false;
            for (let i = 0; i < games.length; i++) {
                if (games[i].gameid == gameid) {
                    match = true;
                    games.splice(i, 1);
                    break;
                }
            }
            return match;
        };

    });


    mocks.service('moModel', function moModel() {
        this.data = [{
            "market_order_id": "0318201",
            "client_order_id": "03182016021500000001",
            "exchange": "NYSE",
            "shares": 500,
            "amount": 10000,
            "fills": 100,
            "totalShares": 5000,
            "totalAmount": 235000,
            "status": "Done"
        }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }, {
                "market_order_id": "0318201",
                "client_order_id": "03182016021500000001",
                "exchange": "NYSE",
                "shares": 500,
                "amount": 10000,
                "fills": 100,
                "totalShares": 5000,
                "totalAmount": 235000,
                "status": "Done"
            }];

        this.getData = function () {
            return this.data;
        };

    });
})();
