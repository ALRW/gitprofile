describe('GitUserSearchController', function() {
  var ctrl, searchFake, scope;

  beforeEach(module('GitUserSearch'));

  beforeEach(function() {
    searchFake = jasmine.createSpyObj('searchFake', ["query"]);
    module({
      Search: searchFake
    });
  });

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope;
  }));

  beforeEach(inject(function($q) {
    searchFake.query.and.returnValue($q.when({
      data: {
        items: items
      }
    }));
  }));

  var items = [{
    "login": "tansaku",
    "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
    "html_url": "https://github.com/tansaku"
  }, {
    "login": "stephenlloyd",
    "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
    "html_url": "https://github.com/stephenlloyd"
  }];
  describe('When searching for a user', function() {

    it('initializes with an empy search result and term', function() {
      expect(ctrl.searchResult).toBeUndefined();
      expect(ctrl.searchTerm).toBeUndefined();
    });
    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      scope.$apply(); // checks for any differences in the page - calling this apply method on the scope of the whole page instead of just the current test
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });

});
