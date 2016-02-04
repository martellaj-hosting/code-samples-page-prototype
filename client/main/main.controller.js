(function () {
  angular
    .module('app.main')
    .controller('MainController', MainController);

  /**
   * The MainController code.
   */
  MainController.$inject = ['$log', '$http'];
  function MainController ($log, $http) {
    var vm = this;
    
    // Properties
    vm.query = '';
    vm.results = [];
    //vm.results = [{ title: 'Foo', description: 'A great example on foo-ing.', url: 'http://www.github.com/OfficeDev/foo', stars: 2, forks: 0, language: 'Foo++' }, { title: 'Bar', description: 'A great example on bar-ing.', url: 'http://www.github.com/OfficeDev/bar', stars: 5, forks: 2, language: 'BarScript' }];
    
    // Methods
    vm.search = search;
    
    /**
     * Takes the query from the form, Google searches it, then takes results
     * and strips out the repos it returned (checking for dupes), and then queries
     * the GitHub API for more info about the repos before displaying.
     * 
     * @name search
     */
    function search () {
      vm.results = [];
      
      // Block empty searches.
      if (vm.query === '') {
        return;
      }
      
      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/customsearch/v1?q=' + encodeURIComponent(vm.query) + '&cx=001554376850834171600%3Akra-ducthrw&key=AIzaSyANkoMU3KYQb-ByhIACZF0hGylozYzzBFI'
      }).then(function (response) {
        var results = response.data.items;
        var repos = getRepos(results);
        getGitHubInfo(repos);
      }, function (error) {
        // TODO: Handle error.
      });
    }
    
    /**
     * Given Google search results, this function strips out the repos that were 
     * returned.
     * 
     * @name getRepos
     * @param results An array of Google search results from the Custom Search API.
     * @returns An array of repos to collect info on later.
     */
    function getRepos (results) {
      var repos = [];
      
      for (var i = 0; i < results.length; i++) {
        var repoName = results[i].link.split('/')[4];
        if (repos.indexOf(repoName) === -1) {
          repos.push(repoName);
        }
      }
      
      return repos;
    }
    
    function getGitHubInfo (repos) {
      for (var i = 0; i < repos.length; i++) {
        $http({
          method: 'GET',
          url: 'https://api.github.com/repos/OfficeDev/' + repos[i]
        }).then(function (response) {
          vm.results.push({
            title: response.data.name,
            description: response.data.description,
            url: response.data.html_url,
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            language: response.data.language
          });
        }, function (error) {
          // TODO: Handle error.
        });
      }
    }
    
    /**
     * This function does any initialization work the
     * controller needs.
     */
    (function activate () {
      $log.debug('Activated MainController.');
    })();
  }
})();