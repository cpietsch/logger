function Logger() {

    function self() {}

    var _buffer = [];
    var _view = "";
    var _startTime = new Date() * 1;
    var _maxBufferSize = 10;
    var _loggerUrl = "";

    self.register = function(view) {
        _view = view;
        return self;
    }

    self.log = function(obj) {
        obj.view = _view;
        obj.time = new Date() * 1;
        obj.location = document.location.href;

        _buffer.push(obj);
        // console.warn("logger",obj);
        // uncomment this console to see the log event

        if (_buffer.length > _maxBufferSize) {
            self.sync();
        }
        return self;
    }

    self.sync = function() {
        console.warn("uploading");

        var upload = JSON.stringify(_buffer);
        _buffer = [];
        d3.json(_loggerUrl)
            .post(upload, function(error, data) {
                console.warn("done uploading")
            });
    }

    self.buffer = function() {
        console.warn("logger", _buffer);
        return self;
    }

    self.bufferSize = function(_) {
        _maxBufferSize = _;
        return self;
    }

    self.url = function(_) {
        _loggerUrl = _;
        return self;
    }

    window.onbeforeunload = function() {
        self.log({ action: "close" });
        self.sync();
    };

    return self;
}
