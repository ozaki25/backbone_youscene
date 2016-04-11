var Config = require('./Config');
var LogFormatter = require('./LogFormatter');

var Logger = {
    DEBUG_LEVEL: 3,
    INFO_LEVEL: 2,
    ERROR_LEVEL: 1,
    NONE_LEVEL: 0,

    keyName: 'log_ls_',
    logLevel: 100,
    deviceId: null,

    setLogLevel: function(level) {
        this.logLevel = level;
    },
    setDeviceId: function(id) {
        this.deviceId = id;
    },
    logWrite: function(targetLevel, str, param) {
        if(targetLevel > this.logLevel) return;
        var ls = window.localStorage;
        var key = this.keyName;
        if(this.deviceId) key += this.deviceId + '_';
        key += Date.now();

        var loopFlag = true;
        while(loopFlag) {
            ls.getItem(key) ? key += 'a' : loopFlag = false;
        }

        var logData = {
            log: str,
            level: targetLevel,
            time: Date.now()
        };
        if(param && typeof param.objName !== 'undefined') logData.obj = param.objName;
        if(param && typeof param.objId !== 'undefined') logData.objId = param.objId;
        ls.setItem(key, JSON.stringify(logData));
    },
    debug: function(str, param) {
        this.logWrite(this.DEBUG_LEVEL, str, param);
    },
    info: function(str, param) {
        this.logWrite(this.INFO_LEVEL, str, param);
    },
    error: function(str, param) {
        this.logWrite(this.ERROR_LEVEL, str, param);
    },
    show: function() {
        var ls = window.localStorage;
        for(var i = 0; i < ls.length; i++) {
            var key = ls.key(i);
            if(key.indexOf(this.keyName) === 0) {
                var logData = JSON.parse(ls.getItem(key));
                console.log(LogFormatter.formatLog(logData, this.deviceId));
            }
        }
    },
    getLogs: function(callback) {
        setTimeout(function() {
            var logs= [];
            var ls = window.localStorage;
            for(var i = 0; i < ls.length; i++) {
                var key = ls.key(i);
                if(key.indexOf(this.keyName) === 0) {
                    var logData = JSON.parse(ls.getItem(key));
                    logs.push(logData);
                }
            }
            var logObj = {};
            logObj.log = logs;
            if(this.deviceId) logObj.deviceId = this.deviceId;
            if(callback) callback(logObj);
        }.bind(this), 0);
    },
    getLogsAsText: function(callback) {
        setTimeout(function() {
            var str = '';
            var ls = window.localStorage;
            console.log('Keys : ' + ls.length);
            if(ls.remainingSpace) console.log('Remaining Space : ' + ls.remainingSpace);
            for(var i = 0; i < ls.length; i++) {
                var key = ls.key(i);
                if(key.indexOf(this.keyName) === 0) {
                    var logData = JSON.parse(ls.getItem(key));
                    str += LogFormatter.formatLog(logData, this.deviceId) + '\n';
                }
            }
            if(callback) callback(str);
        }.bind(this), 0);
    },
    clear: function() {
        var ls = window.localStorage;
        for(var i = ls.length - 1; i > 0; i--) {
            var key = ls.key(i);
            if(key.indexOf(this.keyName) === 0) ls.removeItem(key);
            console.log('Clear : Completed');
        }
    },
}

module.exports = Logger;
