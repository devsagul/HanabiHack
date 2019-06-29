var schema = require('./models');

var user = new schema.models.User({name:"Schroeder", age: 23});
user.save(function (err) {
    var post = user.posts.build({title: 'Hello Azure'});
    post.save(console.log);
});
