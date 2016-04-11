angular.module('yummyword.registerController',[])

.controller('RegisterController',function($state,$scope,$http,$ionicLoading,$ionicPopup,
									  $timeout,$ionicPlatform,$mdDialog, Auth
){
	// Register controller
	$scope.user = {};

	$scope.myDate = new Date();
	$scope.minDate = new Date(
		$scope.myDate.getFullYear() - 100,
		$scope.myDate.getMonth(),
		$scope.myDate.getDate()
	);
	$scope.maxDate = new Date(
		$scope.myDate.getFullYear(),
		$scope.myDate.getMonth(),
		$scope.myDate.getDate()
	);

    $scope.showHints = true;

	$scope.countries = [
		{
			name: "Argentina",
			cities :  [
				'Buenos Aires','Catamarca','Chaco','Chubut','Ciudad de Buenos Aires',
				'Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa',
				'La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta',
				'San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero',
				'Tierra del Fuego','Tucumán',
			],
		},
		{
			name: 'Australia' ,
			cities : [
				'Australian Capital Territory','New South Wales','Northern Territory',
				'Queensland','South Australia','Tasmania','Victoria','Western Australia',
			],
		},
		{
			name :'Brasil',
			cities: [
				'Acre','Alagoas','Amazonas','Amapá','Bahia','Ceará','Distrito Federal',
				'Espírito Santo','Goiás','Maranhão','Minas Gerais','Mato Grosso do Sul',
				'Mato Grosso','Pará','Paraíba','Pernambuco','Piauí','Paraná','Rio de Janeiro',
				'Rio Grande do Norte','Rondônia','Roraima','Rio Grande do Sul',
				'Santa Catarina','Sergipe',	'São Paulo','Tocantins',
			],
		},
		{
			name : 'Bolivia',
			cities:	[
				'Beni','Chuquisaca','Cochabamba','La Paz','Oruro','Pando','Potosi',
				'Santa Cruz','Tarija'
			],
		},
		{
			name : 'Canada',
			cities : [
				'Alberta','British Columbia','Manitoba','New Brunswick',
				'Newfoundland and Labrador','Northwest Territories','Nova Scotia','Nunavut',
				'Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon Territory',
			],
		},
		{
			name : 'Chile',
			cities	: [
				'Aysén del General Carlos Ibáñez del Campo','Antofagasta','Araucanía',
				'Arica y Parinacota','Atacama','Biobío','Coquimbo',
				'Libertador General Bernardo O\'Higgins','Los Lagos','Los Ríos',
				'Magallanes y de la Antártica Chilena','Maule','Metropolitana de Santiago',
				'Tarapacá','Valparaíso',
			],
		},
		{
			name : 'China',
			cities : [
				'Anhui Sheng','Macau','Beijing Shi','Chongqing Shi','Fujian Sheng',
				'Gansu Sheng','Guangdong Sheng','Guangxi Zhuangzuzizhiqu','Guizhou Sheng',
				'Hainan Sheng','Hebei Sheng','Henan Sheng','Heilongjiang Sheng',
				'Hubei Sheng','Hunan Sheng','Jilin Sheng','Jiangsu Sheng','Jiangxi Sheng',
				'Liaoning Sheng','Neimenggu Zizhiqu','Ningxia Huizuzizhiqu','Qinghai Sheng',
				'Shandong Sheng','Shanxi Sheng','Shaanxi Sheng','Shanghai Shi',
				'Sichuan Sheng','Taiwan','Tianjin Shi','Xizang Zizhiqu','Hong Kong',
				'Xinjiang Weiwuerzizhiqu','unnan Sheng','Zhejiang Sheng',
			],
		},
		{
			name : 'Colombia',
			cities : [
				'Amazonas','Antioquia','Arauca','Atlántico','Bolívar','Boyacá','Caldas',
				'Caquetá','Casanare','Cauca','Cesar','Córdoba','Cundinamarca',
				'Chocó','Guainía','Guaviare','Huila','La Guajira','Magdalena', 'Meta',
				'Nariño','Norte de Santander','Putumayo','Quindío','Risaralda',
				'San Andrés, Providencia y Santa Catalina','Santander','Sucre',
				'Tolima','Valle del Cauca','Vaupés','Vichada',
			],
		},
		{
			name : 'Ecuador',
			cities : [
				'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi','El Oro',
				'Esmeraldas','Galápagos','Guayas','Imbabura','Loja','Los Ríos',
				'Manabí','Morona','Napo','Orellana','Pastaza','Pichincha','Santa Elena',
				'Santo Domingo','Sucumbíos','Tungurahua','Zamora'
			],
		},
		{
			name : 'España',
			cities : [
				"A Coruña",'Alava','Albacete','Alicante',"Almería",'Asturias',"Ávila",
				'Badajoz','Baleares','Barcelona','Burgos',"Cáceres","Cádiz",
				'Cantabria',"Castellón",'Ceuta','Ciudad Real',"Córdoba",'Cuenca',
				'Girona','Granada','Guadalajara',"Guipúzcoa",'Huelva','Huesca',
				"Jaén",'La Rioja','Las Palmas',"León","Lleida",'Lugo','Madrid',
				"Málaga",'Melilla','Murcia','Navarra','Ourense','Palencia','Pontevedra',
				'Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria',
				'Tarragona','Teruel','Toledo','Valencia','Valladolid','Vizcaya',
				'Zamora','Zaragoza',
			],
		},
		{
			name : 'Paraguay',
			cities : [
				'Alto Paraguay','Alto Paraná','Amambay','Asunción','Boquerón','Caaguazú',
				'Caazapá','Canindeyú','Central','Concepción','Cordillera','Guairá',
				'Itapúa','Misiones','Ñeembucú','Paraguarí','Presidente Hayes','San Pedro'
			],
		},
		{
			name : 	'Peru',
			cities : [
				'Amazonas','Áncash','Apurímac','Arequipa','Ayacucho','Cajamarca',
				'Callao','Cusco','Huancavelica','Huánuco','Ica','Junín','La Libertad',
				'Lambayeque','Lima','Loreto','Madre de Dios','Moquegua','Pasco',
				'Piura','Puno','San Martin','Tacna','Tumbes','Ucayali',
			],
		},
		{
			name : 'United States',
			cities : [
				'Alabama','Alaska','Arizona','Arkansas','California','Colorado',
				'Connecticut','Delaware','District of Columbia','Florida','Georgia',
				'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
				'Louisiana','Maine','Maryland','Massachusetts','Michigan',
				'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
				'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
				'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
				'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
				'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
				'Armed Forces (Americas)','Armed Forces (Europe, Canada, Middle East, Africa)',
				'Armed Forces (Pacific)','American Samoa','Federated States of Micronesia',
				'Guam','Marshall Islands','Northern Mariana Islands','Palau','Puerto Rico',
				'Virgin Islands',
			],
		},
		{
			name : 	'Uruguay',
			cities :[
				'Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida',
				'Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera',
				'Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'
			],
		},
		{
			name : 	"Venezuela",
			cities :[
				'Amazonas','Anzoátegui','Apure','Aragua','Barinas','Bolívar','Carabobo',
				'Cojedes','Delta Amacuro','Dependencias Federales','Distrito Federal',
				'Falcón','Guárico','Lara','Mérida','Miranda','Monagas','Nueva Esparta',
				'Portuguesa','Sucre','Táchira','Trujillo','Vargas','Yaracuy','Zulia',
			]
		}

	];

	$scope.cities = [];

	$scope.updateCities = function(value){
		console.log(value);
		var country = JSON.parse(value);
		$scope.pais = country.name;
		$scope.cities = country.cities;
		console.log($scope.user);
//		$scope.user.country = country.name;

	};

	$scope.register=function()
	{
		console.log("usuario ->" + $scope.user.firstName);
		console.log("password ->" + $scope.user.password1);
		console.log("password ->" + $scope.user.password2);
		console.log(Auth);
		console.log("-------------------------------------");

		if($scope.user.password1 === $scope.user.password2){

			$scope.loading = $ionicLoading.show({
				content: '<ion-spinner></ion-spinner>',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 0,
				showDelay: 0
			});

			var email = $scope.user.email;
			var password = $scope.user.password1;
			if (email && password) {
				Auth.$createUser({
					'first_name' : $scope.user.firstName,
					'last_name' : $scope.user.lastName,
					'country' : $scope.user.country,
					'city' : $scope.user.city,
					'gender' : $scope.user.sexo,
					'birthsay' : $scope.user.birthday,
					'email': email,
					'password': password
				})
				.then(function(userData) {
					// do things if success
				    console.log('User creation success');
					console.log(userData);

					$ionicLoading.hide();
					$state.go('home');

				}, function(error) {
					// do things if failure
					console.log(error);
					switch (error.code) {
						case "EMAIL_TAKEN":
							$mdDialog.show({
								clickOutsideToClose: true,
								scope: $scope,        // use parent scope in template
								openFrom : '#register-button',
								// or an element
								closeTo : angular.element(document.querySelector('#register-button')),
								preserveScope: true,  // do not forget this if use parent scope
								template:'<md-dialog>' +
								' <h3>The new user account cannot be created because the email is already in use.</h3>'+
								'  <md-dialog-actions>' +
								'    <md-button ng-click="closeDialog()" class="md-primary">' +
								'     Ok!' +
								'    </md-button>' +
								'  </md-dialog-actions>' +
								'</md-dialog>',
								controller: function DialogController($scope, $mdDialog) {
									$scope.closeDialog = function() {
										$mdDialog.hide();
									};
								}
							});
							console.log("The new user account cannot be created because the email is already in use.");
							break;
						case "INVALID_EMAIL":
							$mdDialog.show({
								clickOutsideToClose: true,
								scope: $scope,        // use parent scope in template
								openFrom : '#register-button',
								// or an element
								closeTo : angular.element(document.querySelector('#register-button')),
								preserveScope: true,  // do not forget this if use parent scope
								template:'<md-dialog>' +
								' <h3>The specified email is not a valid email.</h3>'+
								'  <md-dialog-actions>' +
								'    <md-button ng-click="closeDialog()" class="md-primary">' +
								'     Ok!' +
								'    </md-button>' +
								'  </md-dialog-actions>' +
								'</md-dialog>',
								controller: function DialogController($scope, $mdDialog) {
									$scope.closeDialog = function() {
										$mdDialog.hide();
									};
								}
							});
							console.log("The specified email is not a valid email.");
							break;
						default:
							$mdDialog.show({
								clickOutsideToClose: true,
								scope: $scope,        // use parent scope in template
								openFrom : '#register-button',
								// or an element
								closeTo : angular.element(document.querySelector('#register-button')),
								preserveScope: true,  // do not forget this if use parent scope
								template:'<md-dialog>' +
								' <h3>Ups!!! something is wrong :(. We cannot crear your user."</h3>'+
								'  <md-dialog-actions>' +
								'    <md-button ng-click="closeDialog()" class="md-primary">' +
								'     Ok!' +
								'    </md-button>' +
								'  </md-dialog-actions>' +
								'</md-dialog>',
								controller: function DialogController($scope, $mdDialog) {
									$scope.closeDialog = function() {
										$mdDialog.hide();
									};
								}
							});
							console.log("Error creating user:", error);
					}
					$ionicLoading.hide();
				});
			}
			/*
			Auth.$createUser({
				//first_name : $scope.user.firstName,
				//last_name : $scope.user.lastName,
				//country : $scope.user.country,
				//city : $scope.user.city,
				//gender : $scope.user.sexo,
				//birthsay : $scope.user.birthday,
				email:  $scope.user.email,
				password: $scope.user.password1

			}, function(error, userData) {
				if (error) {
					switch (error.code) {
						case "EMAIL_TAKEN":
							console.log("The new user account cannot be created because the email is already in use.");
							break;
						case "INVALID_EMAIL":
							console.log("The specified email is not a valid email.");
							break;
						default:
							console.log("Error creating user:", error);
					}
					$ionicLoading.hide();
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					//Guardamos en el local storage los datos del usuario
					localStorage.usuario = JSON.stringify(userData);
					console.log(userData);

					$ionicLoading.hide();
					$state.go('tab.home');
				}
			});
			*/
		}else{
			$mdDialog.show({
				clickOutsideToClose: true,
				scope: $scope,        // use parent scope in template
				openFrom : '#register-button',
				// or an element
				closeTo : angular.element(document.querySelector('#register-button')),
				preserveScope: true,  // do not forget this if use parent scope
				// Since GreetingController is instantiated with ControllerAs syntax
				// AND we are passing the parent '$scope' to the dialog, we MUST
				// use 'vm.<xxx>' in the template markup
				template:'<md-dialog>' +
						' <h3>The passwords are not the same.</h3>'+
						'  <md-dialog-actions>' +
						'    <md-button ng-click="closeDialog()" class="md-primary">' +
						'     Ok!' +
     					'    </md-button>' +
						'  </md-dialog-actions>' +
						'</md-dialog>',
				controller: function DialogController($scope, $mdDialog) {
					$scope.closeDialog = function() {
						$mdDialog.hide();
					};
				}
			});
		}
	};
});
