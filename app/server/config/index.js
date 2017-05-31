import nconf from 'nconf'

const PATH_TO_CONFIG = __dirname + '/config.json'

nconf.argv()
    .file({ file: PATH_TO_CONFIG })

export default nconf
