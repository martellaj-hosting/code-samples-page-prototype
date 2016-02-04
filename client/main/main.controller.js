(function () {
  angular
    .module('app.main')
    .controller('MainController', MainController);

  /**
   * The MainController code.
   */
  MainController.$inject = ['$log'];
  function MainController ($log) {
    var vm = this;
    
    // Properties
    vm.showResults = false;
    vm.results = [{ title: 'Foo', description: 'A great example on foo-ing.', url: 'http://www.github.com/OfficeDev/foo', stars: 2, forks: 0, language: 'Foo++' }, { title: 'Bar', description: 'A great example on bar-ing.', url: 'http://www.github.com/OfficeDev/bar', stars: 5, forks: 2, language: 'BarScript' }];
    
    // Methods
    vm.search = search;
    
    function search () {
      vm.showResults = true;
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