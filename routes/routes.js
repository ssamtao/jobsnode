const jobRoutes = require('./jobs');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('<div class="container">'+
        '<hr>'+
        '<h1>Create New Job</h1>'+
        '<hr>'+
        '<form action="http://localhost:3001/jobs" method="POST">'+
        '    <div class="form-group">'+
        '        <label>JOB ID</label>'+
        '        <input class="form-control" name="jobnum">'+
        '    </div>'+
        '    <div class="form-group">'+
        '        <label for="Title">Title</label>'+
        '        <input class="form-control" name="title">'+
        '    </div>'+
        '    <button type="submit" class="btn btn-primary">Submit</button>'+
        '</form>'+
    '</div>');
    
    });

    // // other routes
    jobRoutes(app, fs);

};

module.exports = appRouter;