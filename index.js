//Using Github's node api wrapper: https://github.com/octokit/node-github
var githubAPI = require('github');

var github = new githubAPI({
  debug: true
});

//create class with username parameter & functions for getting repos, stars and profile info
class githubSearch {
  constructor(name) {
    this.name = name;
  }

  repos() {
    github.repos.getForUser(
      {
        username: this.name
      },
      function(err, res) {
        if (err) throw err;
        var len = res.data.length;
        var names = [];
        for (var i = 0; i < len; i++) {
          names.push(res.data[i].name);
        }
        console.log(names);
      }
    );
  }

  stars() {
    github.activity.getStarredReposForUser(
      {
        username: this.name
      },
      function(err, res) {
        if (err) throw err;
        var len = res.data.length;
        var names = [];
        for (var i = 0; i < len; i++) {
          names.push(res.data[i].repo['url']);
        }
        console.log(names);
      }
    );
  }

  profile() {
    github.users.getForUser(
      {
        username: this.name
      },
      function(err, res) {
        if (err) throw err;
        console.log(res);
      }
    );
  }
}

//usability, fetching info for user 'Holly-E'
let search = new githubSearch('Holly-E');
search.repos();
search.stars();
search.profile();
