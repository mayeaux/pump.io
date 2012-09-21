// server.js
//
// entry point activity pump application
//
// Copyright 2011-2012, StatusNet Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var cluster = require("cluster"),
    os = require("os"),
    makeApp = require("./lib/app").makeApp,
    config = require("./config"),
    cnt,
    i;

if (cluster.isMaster) {
    cnt = config.children || Math.max(os.cpus().length - 1, 1);
    for (i = 0; i < cnt; i++) {
        cluster.fork();
    }
} else { 
    makeApp(config, function(err, app) {
        if (err) {
            console.log(err);
        } else {
            app.run(function(err) {});
        }
    });
}
