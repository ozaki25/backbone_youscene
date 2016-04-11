var LoggerFormatter = {
    DEBUG_LEVEL: 3,
    INFO_LEVEL: 2,
    ERROR_LEVEL: 1,

    getTimestamp: function(orgms) {
        var date = new Date(orgms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var ms = date.getMilliseconds();
        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;
        if(min < 10) min = '0' + min;
        if(sec < 10) sec = '0' + sec;
        if(ms < 10) ms = '00' + ms;
        else if(ms < 100) ms = '0' + ms;

        var result = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '.' + ms;
        return result;
    },
    formatLog: function(logData, deviceId) {
        var prefix = '';
        switch(logData.level) {
            case this.ERROR_LEVEL:
                prefix += 'ERROR';
                break;
            case this.INFO_LEVEL:
                prefix += 'INFO';
                break;
            case this.DEBUG_LEVEL:
                prefix += 'DEBUG';
                break;
            default:
                prefix += 'UNDEFINED'
                break;
        }
        var logVarStr = ' ';
        if(deviceId) logVarStr += deviceId + ' ';
        if(logData.obj) logVarStr += logData.obj + ' ';
        if(logData.objId) logVarStr += logData.objId + ' ';

        var logStr = this.getTimestamp(logData.time) + ' ' + prefix + logVarStr + '- ' + logData.log;
        return logStr;
    },
    formatLogs: function(logArray, deviceId) {
        var logStrArray = [];
        for(var i = 0; i < logArray.length; i++) {
            logStrArray.push(this.formatLog(logArray[i], deviceId));
        }
    }
};

module.exports = LoggerFormatter;
