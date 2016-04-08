angular.module('yummyword.directives',[])

.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            $timeout(function() {
                element[0].focus();
            }, 150);
        }
    };
})

.directive('nxGeometry', function(){

	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			// Scene variables
			var camera, scene, geometry, renderer, material, object, container;

			// Element dimensions
			scope.width           = element[0].offsetWidth;
			scope.height          = element[0].offsetHeight;
			scope.objectColor     = '#ffaa44';
			scope.backgroundColor = '#333333';

			// Initialization function
			scope.init = function(){

				container = angular.element('<div>')[0];

				element[0].appendChild(container);

				camera   = new THREE.PerspectiveCamera(20, scope.width / scope.height, 1, 1000);

				camera.position.x = 5;
				camera.position.y = 0;
				camera.position.z = 0;


				scene    = new THREE.Scene();

				geometry = new THREE.BoxGeometry(1,1,1);

				material = new THREE.MeshBasicMaterial({color: "#ffffff"});

				object   = new THREE.Mesh(geometry, material);

				object.position.x = 5;
				object.position.y = 5;
				object.position.z = 5;

				scene.add(object);

				renderer = new THREE.WebGLRenderer();

				renderer.setSize(scope.width, scope.height);
				renderer.setClearColor(scope.backgroundColor);


				container.appendChild(renderer.domElement);
			}; // @end scope.init

			scope.render = function(){

				camera.lookAt(scene);

				// Traverse the scene, rotate the Mesh object(s)
				scene.traverse(function(element){

					if(element instanceof  THREE.Mesh){

						element.rotation.x += 0.0065;
						element.rotation.y += 0.0065;

					}

					renderer.render(scene, camera);

				});

			}; // @end scope.render

			scope.animate = function(){

				requestAnimationFrame(scope.animate);
				scope.render();

			};

			scope.init();
			scope.animate();
		}

	};

});

