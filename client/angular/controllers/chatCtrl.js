DissertationApp.controller('chatCtrl', ['$scope', 'Socket', function($scope, Socket){
	
	$scope.users = [];
    $scope.messages = [];
    $scope.message ="";

    $scope.UserOnline = function(name){
            if(name == "" || name == null)
            {               
               alert('You must enter a username!');
            }
            else {
                Socket.connect();                
                Socket.emit('add-user', {username: name})
                $scope.showme=true;                                             
            }

    }    
 
    $scope.sendMessage = function(msg){
        if(msg != null && msg != '')
            Socket.emit('message', {message: msg})
        $scope.msg = '';

    }
    
      
    Socket.emit('request-users', {});
    
    Socket.on('users', function(data){
        $scope.users = data.users;
    });
    
    Socket.on('message', function(data){
        $scope.messages.push(data);
    });
    
    Socket.on('add-user', function(data){
        $scope.users.push(data.username);
        $scope.messages.push({username: data.username, message: 'has entered the channel'});
    });
    
    Socket.on('remove-user', function(data){
        $scope.users.splice($scope.users.indexOf(data.username), 1);
        $scope.messages.push({username: data.username, message: 'has left the channel'});
    });
    
    Socket.on('already-exist', function(data){        
        alert(data.message);
        $scope.showme= false;
        
    })


	  $scope.$on('$locationChangeStart', function(event){
        Socket.disconnect(true);        
    })
	
}])