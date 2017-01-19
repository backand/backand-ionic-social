angular
  .module('myTodoApp', ['backand'])
  .config(function (BackandProvider) {
    BackandProvider.setAppName('backandtodoapp');
    BackandProvider.setSignUpToken('76a0ed19-c9d4-405a-9e20-493d637b131c');
    BackandProvider.setAnonymousToken('6adbc622-36b5-496c-b288-19ea28816f10');
    BackandProvider.runSocket(true);
  })
  .controller('DemoCtrl', ['$scope', '$http', 'Backand', DemoCtrl]);

function DemoCtrl($scope, $http, Backand) {
  // console.log(Backand);
  $scope.todos = [];
  var objectName = 'todo';

  Backand.on('todo_updated', function (data) {
    //Get the event and refresh the list
    console.log("event:" + data);
    $scope.readList();
  });

  $scope.readList = function () {
    var params = {
      pageSize: 50,
      pageNumber: 1,
      sort: '[{fieldName:\'id\', order:\'desc\'}]'
    }
    Backand.object.getList(objectName, params).then(function(response) {
      $scope.todos = response.data;
    }).catch(err => console.log(err));
  };
  $scope.readList();

  $scope.create = function (newTodo) {
    return Backand.object.create(objectName, newTodo, {returnObject: true}).then(function(response) {
      return response.data;
    });
  };

  $scope.update = function (todo) {
    return Backand.object.update(objectName, todo.id, todo, {returnObject: true}).then(function(response) {
      return response.data;
    });
  };

  $scope.delete = function (todo) {
    return Backand.object.remove(objectName, todo.id).then(function(response) {
      $scope.readList();
      return response.data;
    });
  };
}
