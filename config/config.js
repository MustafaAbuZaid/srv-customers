var convict = require('convict');

var envs = {
    "env": "env"
}

// Define a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: Object.keys(envs),
        default: "env",
        env: "NODE_ENV"
    },
    port: {
        doc: "",
        format: "port",
        default: 3006
    },
    expirationTime: {
        doc: "",
        format: "duration",
        default: 30
    },
    db: {
        server: {
            doc: "",
            format: "*",
            default: "localhost"
        },
        port: {
            doc: "",
            format: "port",
            default: 27017
        },
        authDb: {
            doc: "",
            format: "*",
            default: "vehicle-tracker"
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
console.log(env);
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
