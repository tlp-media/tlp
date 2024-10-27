var toml = require('toml');
var concat = require('concat-stream');
var fs = require('fs');

fs.createReadStream('./data/posts.toml', 'utf8').pipe(concat(function(data) {
    var parsed = toml.parse(data);
    console.log(parsed)
    console.log(parsed.db.title)
    console.log(parsed.db.author)
	console.log(parsed.db.posts)

	parsed.posts.forEach(function(post) {
		console.log(post.title)
		console.log(post.description)
		console.log(post.data + "\n")
	})
}));
