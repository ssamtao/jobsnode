const jobRoutes = (app, fs) => {

 
    // variables
    const dataPath = './data/jobslist.json';

    function read_json_file() {
        //var file = './data/contacts.json';
        return fs.readFileSync(dataPath);
    }

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/jobs', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    let resultjobs = [];
    app.get('/jobs/:number', function(request, response) {
        var json_result = JSON.parse(read_json_file());
        var jobfound = null;
        response.setHeader('content-type', 'application/json');
        for (let job of json_result) {
            if (job.jobnum === request.params.number) {
                jobfound = job;
                break;
            }
        }
        if (jobfound ===null) 
            response.send("Job not found :"+request.params.number);
        else 
        response.json(jobfound);
        
    });
    // CREATE
    app.post('/jobs', (req, res) => {

        readFile(data => {
            const newJobId = Object.keys(data);

            // add the new user
            data[newJobId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new job added');
            });
        },
            true);
    });


   
};

module.exports = jobRoutes;