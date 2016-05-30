# logger
lightweight js+php logger for visualizations

## setup

 1. import the [logger table](https://github.com/cpietsch/logger/blob/master/mysql/logger.sql) on your mysql server
 2. change the mysql logins in [db.php](https://github.com/cpietsch/logger/blob/master/php/db.php)
 3. upload the php files to your server
 4. change the logger url in [example](https://github.com/cpietsch/logger/blob/master/js/example.html)
 5. log stuff

## api


**Create a new instance for a view**
    
    var logger = Logger()
      .register("test")
      .bufferSize(10)
      .url("http://domain.com/path/to/logger.php");


**.register("test")**

register a view. this will be appended to the log event.

**.bufferSize(size)**

log events will be stored in a buffer array before sent to the php endpoint. size is the number of entries to be stored in the buffer. for heavy logging set the size higher so less http reqs will be fired.

**.url("http://domain.com/path/to/logger.php")**

your url to the php endpoint

## logging

    logger.log({ action: "test", bla: 1, foo: "bar", arr: [1,2,3] });**

you can put an js-object of your choice in the logger. very flexible.
