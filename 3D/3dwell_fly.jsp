<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
	%>
	<base href="<%=basePath%>">
	 
	<link href="3D/style/style.css" rel="stylesheet" type="text/css" media="screen"/>
	<script src="js/jquery-1.10.1.min.js"></script>
	<script src="3D/build/three.min.js"></script>
	<script src="3D/build/gentilis_regular.typeface.js"></script>
	<script src="3D/js/wires.js"></script>
	<script src="3D/js/profile.js"></script>
	<script src="3D/js/well1.js"></script>
</head>
	<body > 
	<script src="js/controls/OrbitControls.js"></script>	
	<script src="js/controls/FirstPersonControls.js"></script>
	<script src="js/controls/FlyControls.js"></script>
	<script src="js/controls/PointerLockControls.js"></script>

	<div id="blocker">

			<div id="instructions">
				<span style="font-size:40px">Click to play</span>
				<br />
				(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
			</div>

		</div>
		
	<script>
	var meshes;
	var container,controls,scene,renferer,camera;
	var clock = new THREE.Clock();

		init();
		animate();
		onWindowResize();
		function init(){
			//var container,controls;
			// Grab our container div
	        var container = document.createElement( 'div' );
	        document.body.appendChild(container)
	 		// Put in a camera
	        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	        camera.position.set( 0, 20,10 );
			//鼠标控制
			
		/*
			controls = new THREE.FlyControls( camera );
			controls.movementSpeed = 50;
			controls.domElement = container;
			controls.rollSpeed = 0;
			controls.autoForward = false;
			controls.dragToLook = false;
			
		/*	controls = new THREE.FirstPersonControls( camera );
			controls.movementSpeed = 13;
			controls.lookSpeed = 0.07;
			controls.noFly = true;
			// Don't allow tilt up/down
			controls.lookVertical = true;
			this.clock = new THREE.Clock();
		*/
	        controls = new THREE.OrbitControls( camera );
		    controls.addEventListener( 'change', render );    
	        // Create the Three.js renderer, add it to our div
		    renderer = new THREE.WebGLRenderer( { antialias: true } );
		    renderer.setSize(window.innerWidth / window.innerHeight);
		    container.appendChild( renderer.domElement );
		    scene = new THREE.Scene();
	        // Create a directional light to show off the object
	        /*
			light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 0, 0, 0 );
			scene.add( light );
			light = new THREE.DirectionalLight( 0x002288 );
			light.position.set( -1, -1, -1 );
			scene.add( light );
			light = new THREE.AmbientLight( 0xFFFF00 );
			scene.add( light );
			*/
			//添加1号工井光线
			var light = new THREE.PointLight( 0xffffff, 1, 200);
			light.position.set(0, 20, 20);
			this.scene.add(light);

			light = new THREE.PointLight( 0xffffff, 1, 200);
			light.position.set(20, 0, 0);
			this.scene.add(light);
			//二号工井光线
			var light = new THREE.PointLight( 0xffffff, 1, 200);
			light.position.set(200, 20, 20);
			this.scene.add(light);

			light = new THREE.PointLight( 0xffffff, 1, 200);
			light.position.set(220, 0, 0);
			this.scene.add(light);
			
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
			/*添加1号剖面和管孔
			*/
			draw_profile();
			draw_earth();
			draw_front_hole();
			draw_behind_hole();
			draw_left_hole();
			draw_right_hole();
			/* 
			添加2号剖面和管孔
			*/
			draw_profile1();
			draw_front_hole1();
			draw_behind_hole1();
			draw_left_hole1();
			draw_right_hole1();   
	        /*添加电缆线开始
	         */
	        meshes = L3D.meshes({
					wire1 :	[[-11, 10, 22], [0, 10, 10], [22, 10, 0], [178, 10, 0], [200, 10, 0]],
					wire2 : [[-22, 13, 0], [0, 12, 0], [22, 13, 0], [178, 13, 0], [200, 12, 0], [222, 13, 0]],
					wire3 : [[-4, 10, 22], [0, 5, 0], [0, 10, -21]],
					
	        		wire4 :	[[189, 10, 22], [200, 10, 10], [222, 10, 0]],
					wire5 : [[178, 13, 0], [200, 12, 0], [222, 13, 0]],
					wire6 : [[196, 10, 22], [200, 5, 0], [200, 10, -21]]
			}); 
	        
	        scene.add(meshes.wire1);
	        scene.add(meshes.wire2);
	        scene.add(meshes.wire3);
	        scene.add(meshes.wire4);
	        scene.add(meshes.wire5);
	        scene.add(meshes.wire6);
	        /*添加电缆线结束
	         */        
		}
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
			//var delta = clock.getDelta();
			//controls.update( delta );
			renderer.render( scene, camera );
		}
		
	</script>	
	<div id="list">
		<div id="title">
			电缆线列表
		</div>
		<ul>
			<li class="wire1">测试电缆一	
			</li>
			<li class="wire2">测试电缆二 
			</li>
			<li class="wire3">测试电缆三
			</li>
		</ul>
	</div>
	<script>
	L3D.menu.highLight(meshes);
	</script>
	</body>
</html>
