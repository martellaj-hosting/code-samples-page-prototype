(function () {
  angular
    .module('app.layout')
    .controller('NavbarController', NavbarController);

  /**
   * The NavbarController code.
   */
  NavbarController.$inject = ['$log', '$route'];
  function NavbarController ($log, $route) {
    var vm = this;
    
    // Properties
    vm.activeTab = null;

    /**
     * This function does any initialization work the
     * controller needs.
     */
    (function activate () { 
      $log.debug('Activated NavbarController.');
      vm.activeTab = $route.current.activeTab;
    })();
  }
})();