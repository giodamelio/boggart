var gulp = require("gulp");
var gutil = require("gulp-util");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var insert = require("gulp-insert");
var nodemon = require("gulp-nodemon");
var shell = require("gulp-shell");

// Compile our es6 code to es5 with babel
gulp.task("babel", function() {
    return gulp.src("src/**/*.js")
        .pipe(insert.prepend("require(\"source-map-support\").install(); require(\"pretty-error\").start();\n\n"))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("lib"));
});

// Watch and auto-recompile
gulp.task("watch", ["babel"], function() {
    gulp.watch("src/**/*.js", ["babel"]);
});

// Run the server
gulp.task("server", ["babel"], function() {
    nodemon({
        script: "./lib/main.js",
        watch: "./lib",
        ext: "js",
        nodeArgs: "--debug"
    }).on("restart", function() {
        gutil.log("Server restarted");
    });
});

// Run node inspector
gulp.task("inspector", shell.task("./node_modules/.bin/node-inspector"));

// Run the dev server
gulp.task("dev", ["watch", "server", "inspector"]);

