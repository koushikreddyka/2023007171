const Log = require("./logger");

async function test() {
    const result = await Log(
        "backend",
        "info",
        "service",
        "Logging middleware initialized successfully"
    );

    console.log(result);
}

test();