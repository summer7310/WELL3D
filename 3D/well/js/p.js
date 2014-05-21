/**
 * 初始化3D场景，包括容器，相机，控制，渲染，光线，帆布的添加
 * 调用画3d剖面和管孔
 * @return {[type]}
 */
	var Init = function(req, req1, req2, req3, req4 ){		
		//var container,camera,controls,scene,renderer;
		// Grab our container div
		var container = document.createElement( 'div' );
		document.body.appendChild(container)
			// Put in a camera
		camera = new THREE.PerspectiveCamera( 70, 1000 / 1000, 1, 1000 );
		//camera.position.set( 0, 20,10 );
		camera.position.y = 0;//设置相机的位置坐标
		camera.position.z = 0;
		//camera.up.y = 20;//设置相机的上为「y」轴方向
		camera.lookAt( {x:0, y:0, z:0 } );//设置视野的中心坐标
		//鼠标控制
		controls = new THREE.OrbitControls( camera );
		//controls.noZoom = true;
		//controls.noRotate = true;
		controls.rotateSpeed = 0.4;
		controls.minDistance = 10;        
		controls.maxDistance = 100;
		controls.maxPolarAngle = Math.PI/2; // radians				
		controls.addEventListener( 'change', render );    
		// Create the Three.js renderer, add it to our div
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize(1000, 1000);
		container.appendChild( renderer.domElement );
		scene = new THREE.Scene();
		// Create a directional light to show off the object
		//设置光源
		var light = new THREE.DirectionalLight( 0xffffff, 1.5 );//设置平行光源
		light.position.set( 1, 1, 1 );//设置光源向量
		scene.add( light );// 追加光源到场景

		var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
		light.position.set( -1, - 0.5, -1 );
		scene.add( light );
		//添加光线
		var amb = new THREE.AmbientLight( 0x404040, 1, 200);
		scene.add(amb);

		//添加前剖面单个管孔	
		var geometry = new THREE.CubeGeometry(3, 3, 1.1);
		var map = THREE.ImageUtils.loadTexture('images/12.png');
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.repeat.set(1,1);
		var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(10, 10, 20);
		scene.add(mesh);

		var draw_profile = new Draw_profile(req);
		var draw_front_hole = new Draw_front_hole(req1);
		var draw_behind_hole = new Draw_behind_hole(req2);
		var draw_left_hole = new Draw_left_hole(req3);
		var draw_right_hole = new Draw_right_hole(req4);
		   
		/*添加电缆线开始
		 */
		meshes = L3D.meshes({
				wire1 :	[[-11, 10, 22], [0, 10, 10], [22, 10, 0]],
				wire2 : [[-22, 13, 0], [0, 12, 0], [22, 13, 0]],
				wire3 : [[-4, 10, 22], [0, 5, 0], [0, 10, -21]]
		}); 

		scene.add(meshes.wire1);
		scene.add(meshes.wire2);
		scene.add(meshes.wire3);
		/*添加电缆线结束
		 */        

	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		render();
	}
	function render() {
		renderer.render( scene, camera );
	}