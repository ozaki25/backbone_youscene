var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Logger = require('./Logger');
var Config = require('./Config');

module.exports = (function() {
    var Framework = {};

    Framework.reference = {
        Model: new Backbone.Model(),
        Collection: new Backbone.Collection(),
        ItemView: new Marionette.ItemView(),
        CompositeView: new Marionette.CompositeView(),
        CollectionView: new Marionette.CollectionView(),
        LayoutView: new Marionette.LayoutView(),
        AppRouter: new Marionette.AppRouter(),
        Application: new Marionette.Application()
    };
    Framework.Logger = Logger;

    window.onerror = function(msg, url, line, col, err) {
        console.log(msg);
        console.log(url);
        console.log(line + ':' + col);
        console.log(err);

        Framework.Logger.error('[ERROR]' + msg + ':' + url + ':' + line + ':' + col);
    };


    Framework.Application = Marionette.Application.extend({
        logLevel: 0,
        log: Logger,
        deviceId: null,
        router: null,
        models: {},

        constructor: function(options) {
            var tmpLogLevel = (!options.logLevel || !_.contains([0, 1, 2, 3, 4], options.logLevel)) ? 1 : options.tmpLogLevel;
            if(typeof Config !== 'undefined') this.logLevel = (!Config.logLevel || tmpLogLevel > Config.logLevel) ? tmpLogLevel : Config.logLevel;
            Framework.Logger.setLogLevel(this.logLevel);

            if(typeof options.deviceId !== 'undefined') this.deviceId = options.deviceId;
            if(typeof options.router !== 'undefined') this.router = options.router;
            if(options && options.id) this.id = options.id;

            var modName = this.moduleName || 'Appliation';
            this.listenTo(this, 'start', function() {
                var name = this.moduleName || 'Application';
                var modId = this.id;
                Framework.Logger.info('[APPLICATION_START]', {objName: name, objId: modId});
                if(this.router) new this.router();
                Backbone.history.start();
            });
            addLogCode(this, modName, this.id, Framework.reference.Application);
            Marionette.Application.apply(this, arguments);
        }
    });

    Framework.AppRouter = Marionette.AppRouter.extend({
        constructor: function(param) {
            var name = this.moduleName || 'AppRouter';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});
            addLogCode(this, name, modId, Framework.reference.AppRouter);
            Marionette.AppRouter.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.RootChannel = Backbone.Wreqr.radio.channel('root');
    Framework.RootChannelEvent = Framework.RootChannel.vent;
    Framework.PageChannel = Backbone.Wreqr.radio.channel('page');
    Framework.RootChannelEvent = Framework.PageChannel.vent;


    Framework.LayoutView = Marionette.LayoutView.extend({
        constructor: function(param) {
            var name = this.moduleName || 'LayoutView';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});
            this.models = param.models;
            this.pageChannel = Framework.PageChannel;
            this.pageChannelEvent = Framework.PageChannelEvent;

            addLogCodeForView(this, name, modId, Framework.reference.LayoutView);
            Marionette.LayoutView.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.CompositeView = Marionette.CompositeView.extend({
        constructor: function(param) {
            var name = this.moduleName || 'CompositeView';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            addLogCodeForView(this, name, modId, Framework.reference.CompositeView);
            Marionette.CompositeView.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.CollectionView = Marionette.CollectionView.extend({
        constructor: function(param) {
            var name = this.moduleName || 'CollectionView';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            addLogCodeForView(this, name, modId, Framework.reference.CollectionView);
            Marionette.CollectionView.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.ItemView = Marionette.ItemView.extend({
        constructor: function(param) {
            var name = this.moduleName || 'ItemView';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            addLogCodeForView(this, name, modId, Framework.reference.ItemView);
            Marionette.ItemView.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.ComponentView = Marionette.CompositeView.extend({
        constructor: function(param) {
            var name = this.moduleName || 'ComponentView';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            var tmpEvents = {};
            var mapping = param.map;
            for(var i in mapping) {
                var eleId = '#' + i;
                var mapData = mapping[i];
                if(!Array.isArray(mapData)) mapData = [mapData];
                for(var j = 0; j < mapData.length; j++) {
                    var mapItem = mapData[j];
                    var actionStr = mapItem.action + 'eleId';
                    if(mapItem.target === 'root') {
                        tmpEvents[actionStr] = this.createEventHandler(Framework.RootChannel, mapItem.event, '[COMPONENT_VIEW_EVENT]' + mapItem.target + ':' + actionStr + ':' + mapItem.event, {objectName: name, objId: modId});
                    } else if(mapItem.target === 'page') {
                        tmpEvents[actionStr] = this.createEventHandler(Framework.PageChannel, mapItem.event, '[COMPONENT_VIEW_EVENT]' +  mapItem.target + ':' + actionStr + ':' + mapItem.event, {objectName: name, objId: modId});
                    } else {
                        Framework.Logger.error('[COMPONENT_VIEW_ERROR] Unknown Target Channel = ' + mapItem.target, {objectName: name, objId: modId});
                    }
                }
            }

            addLogCodeForView(this, name, modId, Framework.reference.CompositeView);
            Marionette.CompositeView.apply(this, arguments);
            this.delefateEvents(tmpEvents);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        },
        createEventHandler: function(channel, event, logStr, logParam) {
            var func = function() {
                Framework.Logger.info(logStr, logParam);
                channel.vent.trigger(event);
            };
            return func;
        }
    });

    Framework.Collection = Backbone.Collection.extend({
        constructor: function(param) {
            var name = this.moduleName || 'Collection';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            this.listenTo(this, 'all', function(eventName) {
                Framework.Logger.debug('[MODEL_EVENT]' + eventName + {objName: name, objId: modId});
                Framework.Logger.debug(JSON.stringify(arguments), {objName: name, objId: modId});
            });

            addLogCode(this, name, modId, Framework.reference.Model);
            Backbone.Collection.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    Framework.Model = Backbone.Model.extend({
        constructor: function(param) {
            var name = this.moduleName || 'Model';
            if(param && param.id) this.id = param.id;
            var modId = this.id;
            Framework.Logger.info('[CONSTRACTOR_START]', {objName: name, objId: modId});

            this.listenTo(this, 'all', function(eventName) {
                Framework.Logger.debug('[MODEL_EVENT]' + eventName + {objName: name, objId: modId});
                Framework.Logger.debug(JSON.stringify(arguments), {objName: name, objId: modId});
            });

            addLogCode(this, name, modId, Framework.reference.Model);
            Backbone.Model.apply(this, arguments);
            Framework.Logger.info('[CONSTRACTOR_END]', {objName: name, objId: modId});
        }
    });

    return Framework;

    function addLogCode(orgThis, modName, modId, refObj) {
        addLogCodeImpl(orgThis, modName, modId, refObj, false);
    }
    function addLogCodeForView(orgThis, modName, modId, refObj) {
        addLogCodeImpl(orgThis, modName, modId, refObj, true);
    }
    function addLogCodeImpl(orgThis, modName, modId, refObj, viewFlag) {
        var funcThis = _.functions(orgThis);
        var funcOrg = _.functions(refObj);
        var funcDiff = viewFlag ? _.without(_.difference(funcThis, funcOrg), 'template', 'childView') : _.difference(funcThis, funcOrg);
        for(var i = 0; i < funcDiff; i++) {
            var funcName = funcDiff[i];
            var tmpFunc = orgThis[funcName];
            orgThis[funcName] = _.wrap(tmpFunc, function(func) {
                var args = [];
                if(arguments.length > 1) {
                    for(var i = 1; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                }
                Framework.Logger.info('[FUNCTION_START] ' + funcName, {objName: name, objId: modId});
                func.apply(orgThis, args);
                Framework.Logger.info('[FUNCTION_END] ' + funcName, {objName: name, objId: modId});
            });
        }
    }
})();
