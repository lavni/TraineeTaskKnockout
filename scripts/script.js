var users=[
{id: 0, email: 'tom@mail.ru', password: '123', isAdmin: false},
{id: 1, email: 'rick@mail.ru', password: '123', isAdmin: true},
{id: 2, email: 'john@mail.ru', password: '123', isAdmin: false}];

function overlay(login){
	var ok = false;
	for (var i=0; i<users.length; i++){
		if (users[i].email === login) {
			if (users[i].isAdmin === true) {
				alert('ADMIN!');
				window.location.assign("users.html");
			} else {
				alert('ok');
			}
		}
	}
}

function login(){
	var vals = localStorage();
	var ok = false;
	for (var i=0; i<users.length; i++){
	 	if (users[i].email === vals[0]) { 
	 		if (users[i].password === vals[1]) {
	 			ok = true;
	 			break;
	 		} 
	 	} 
	}
	if (ok) { 
		overlay(vals[0]);
	} else {
		alert('Invalid login/password');
	}
}

function localStorage(){
	if(typeof(Storage) !== "undefined") {
    	// console.log('1');
    	localStorage.login = $('#autoris input[type=email]').val();
    	localStorage.pass = $('#autoris input[type=password]').val();
    	return [
    	localStorage.login, 
    	localStorage.pass, 
    	];
	} else {
    	alert('Sorry! No Web Storage support..');
	}
}

//knockout
ko.applyBindings(new UsersViewModel());

function UsersViewModel(){
	var self = this;

	self.isAdmin = [true, false];
	
	self.users = ko.observableArray([
		{id: 0, email: 'tom@mail.ru', password: ko.observable('123'), isAdmin: ko.observable(false)},
		{id: 1, email: 'rick@mail.ru', password: ko.observable('123'), isAdmin: ko.observable(true)},
		{id: 2, email: 'john@mail.ru', password: ko.observable('123'), isAdmin: ko.observable(false)}
	]);

	console.log(users);
	
	self.editUser = function(user){ 
		$('table').addClass('none');
		$('#dialog').removeClass("none");
        self.selectedItem(user); 
        
    }
    self.deleteUser = function() { 
    	self.users.remove(this);
    	console.log(self.users());
    }

    self.selectedItem = ko.observable();
	
	self.saveChanges = function() {
       self.selectedItem(null);
       $('#dialog').addClass("none");
       $('table').removeClass('none');
       console.log(self.users());
    };
}

$('#dialog').addClass("none");
