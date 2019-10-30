module.exports = {
    result: class {
        constructor(error, data) {
            if (!error || (error instanceof Error)) {
                this.error = error;
                this.data = data;
            } else {
                console.error(`Invalid parameter type : ${error}`);
            }
        }
    },
    result_Success: class {
        constructor(success, data) {
            this.success = success;
            this.data = data;
        }
    }
}

