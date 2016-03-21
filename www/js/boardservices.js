angular.module('board.services', [])

//-----------------------------------------------------------------------------
.factory('BoardsList', function() {
  var  dummyboardslist = [
    { title: 'Global', id: 0 },
    { title: 'Work', id: 2 },
    { title: 'Home', id: 3 },
    { title: 'Shared by John', id: 4 },
  ];

  return {
    dummyboards: dummyboardslist,
    getBoard: function(index) {
      return $http.get("https://www.yoursite.com/boards").then(function(response) {
        boardslist = response;
        return boardslist;
      });
    },
    addBoard: function() {
      $http.post("https://www.yoursite.com/boards");
    }
  }
})

//-----------------------------------------------------------------------------
.factory('BoardItems', function() {
    var dummyitems = [
      { id: 0, raw: "copy me"},
      { id: 1, raw: "this is a test item"},
      { id: 2, raw: "duh 2.0"},
      { id: 3, raw: "http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state"},
      { id: 4, raw: "http://angular-ui.github.io/bootstrap/"},
      { id: 5, raw: "https://openshift.feedhenry.com/"},
      { id: 6, raw: "https://www.redhat.com/en/about/value-of-subscription"},
      { id: 7, raw: "https://openapis.org/"}
    ];

    return {
    dummyitems: dummyitems,
    getItem: function(index) {
      return $http.get("https://www.yoursite.com/board/0/items").then(function(response) {
        items = response;
        return items;
      });
    },
    addItem: function() {
      $http.post("https://www.yoursite.com/item");
    }
  }
});
