const jobsCltr = {}
jobsCltr.list = async (req, res) => {
    res.send('listing all jobs')
}

jobsCltr.create = async (req, res) => {
    res.send('create a job')
}

module.exports = jobsCltr 