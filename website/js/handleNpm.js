const npm = require("npm");
function runNpmStart(){
    npm.load(()=>npm.run("webpackStart"));
}

export default runNpmStart;