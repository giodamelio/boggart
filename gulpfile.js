var gulp = require("gulp");
var gutil = require("gulp-util");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var insert = require("gulp-insert");
var nodemon = require("gulp-nodemon");
var shell = require("gulp-shell");
var webpack = require("gulp-webpack");

// Compile our es6 code to es5 with babel
gulp.task("babel", function() {
    return gulp.src("src/server/**/*.js")
        .pipe(insert.prepend("require(\"source-map-support\").install(); require(\"pretty-error\").start();\n\n"))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("lib/server/"));
});

// Run the server
gulp.task("server", ["babel"], function() {
    nodemon({
        script: "./lib/server/main.js",
        watch: "./lib/server",
        ext: "js",
        nodeArgs: "--debug"
    }).on("restart", function() {
        gutil.log("Server restarted");
    });
});

// Run node inspector
gulp.task("inspector", shell.task("./node_modules/.bin/node-inspector"));

// Run webpack for frontend
gulp.task("webpack", function() {
     gulp.src("src/client/app.js")
        .pipe(webpack({
            watch: true,
            output: {
                filename: "app.js"
            },
            devtool: "inline-source-map",
            module: {
                loaders: [
                    // Load js with jsx and babel
                    { 
                        test: /\.js$/,
                        loaders: ["jsx", "babel"],
                        exclude: /node_modules/
                    }
                ]
            }
        })).pipe(gulp.dest("lib/client/"));
});

// Copy html to lib/client/
gulp.task("copy-html", function() {
    gulp.src("./src/client/index.html")
        .pipe(gulp.dest("./lib/client/"));
});

// Watch and auto-recompile
gulp.task("watch", ["babel", "copy-html"], function() {
    gulp.watch("src/server/**/*.js", ["babel"]);
    gulp.watch("src/client/index.html", ["copy-html"]);
});

// Run the dev server
gulp.task("dev", ["watch", "server", "inspector", "webpack"]);

