var cp = require("child_process"),
    express = require("express"),
    app = express();

app.use(express.static(__dirname));


app.get('/msg', function(req, res){
    res.writeHead(200, { "Content-Type": "text/event-stream",
        "Cache-control": "no-cache" });

    var spw = cp.spawn('python', ['DeepLearner2.py', '100', '127.0.0.1',1,1,1]),
        str = "";

    spw.stdout.on('data', function (data) {
        str += data.toString();
        res.write('data: ' + data.toString() +"\n\n");
        // just so we can see the server is doing something
        console.log("data");

        // Flush out line by line.
        //var lines = str.split("\n");
        //for(var i in lines) {
        //    if(i == lines.length - 1) {
        //        str = lines[i];
        //    } else{
        //        // Note: The double-newline is *required*
        //        res.write('data: ' + lines[i] + "\n\n");
        //    }
        //}
    });

    spw.on('close', function (code) {
        res.end();
    });

    spw.stderr.on('data', function (data) {
        res.end('stderr: ' + data);
    });
});

app.listen(4000);