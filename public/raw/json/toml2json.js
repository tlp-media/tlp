const tomlJson = require("tomlJson")

let config = tomlJson({ fileUrl: './data/posts.toml' });
console.log(config);
