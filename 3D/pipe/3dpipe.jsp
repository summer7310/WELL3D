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
	<script src="3D/pipe/js/wires.js"></script>
	<script src="3D/pipe/js/profile.js"></script>
	<script src="3D/pipe/js/well1.js"></script>
	<script src="3D/pipe/js/branch.js"></script>
	<script src="lib/controls/OrbitControls.js"></script>	
	</head>
		<body > 		
		<script>
		var meshes;
		var container,controls,scene,renferer,camera;
		var clock = new THREE.Clock();			
			function init(){
		        var container = document.createElement( 'div' );
		        document.body.appendChild(container)
		        //设置相机
		        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 1000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
		        camera.position.y = 20;//设置相机的位置坐标
		        camera.position.z = 30;
		        camera.up.y = 0;//设置相机的上为「y」轴方向
		        camera.lookAt( {x:0, y:20, z:0 } );//设置视野的中心坐标
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
		        //controls.noZoom = true;
				//controls.noRotate = true;
				controls.rotateSpeed = 0.5;
				controls.minDistance = 0;        
				controls.maxDistance = Infinity;
				controls.maxPolarAngle = Math.PI/2; // radians
		        
			    controls.addEventListener( 'change', render );    
		        //开启Three.js渲染器
			    renderer = new THREE.WebGLRenderer( { antialias: true } );//生成渲染器对象（属性：抗锯齿效果为设置有效）
			    renderer.setSize(window.innerWidth / window.innerHeight);//指定渲染器的高宽（和画布框大小一致）
			    container.appendChild( renderer.domElement );//追加 【canvas】 元素到 【canvas3d】 元素中
			    renderer.setClearColorHex(0x666666, 1.0);//设置canvas背景色(clearColor)
			    //设置场景
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
				//设置光源
				var light = new THREE.DirectionalLight( 0xffffff, 1.5 );//设置平行光源
			    light.position.set( 1, 1, 1 );//设置光源向量
				this.scene.add( light );// 追加光源到场景

				var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
				light.position.set( -1, - 0.5, -1 );
				this.scene.add( light );

	/*
				//添加1号工井光线
				var light = new THREE.PointLight( 0xffffff, 1, 200);
				light.position.set(0, 20, 20);
				this.scene.add(light);

				light = new THREE.PointLight( 0xffffff, 1, 200);
				light.position.set(20, 0, 0);
				this.scene.add(light);
				//2号工井光线
				var light = new THREE.PointLight( 0xffffff, 1, 200);
				light.position.set(200, 20, 20);
				this.scene.add(light);

				light = new THREE.PointLight( 0xffffff, 1, 200);
				light.position.set(220, 0, 0);
				this.scene.add(light);
		*/		
				var amb = new THREE.AmbientLight( 0x404040, 1, 200);
				scene.add(amb);
				//添加前剖面单3个管孔	
				var geometry = new THREE.CubeGeometry(3, 3, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});//材质设定
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(-14, 13, -210);
				scene.add(mesh);
				var geometry = new THREE.CubeGeometry(3, 3, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(-14, 18, -210);
				scene.add(mesh);
				var geometry = new THREE.CubeGeometry(3, 3, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(14, 13, -210);
				scene.add(mesh);

				//添加1号剖面和管孔				
				draw_profile();
				draw_earth();
				draw_upface();
				//draw_front_hole();
				draw_behind_hole();
				//draw_left_hole();
				//draw_right_hole();

				//添加2号剖面和管孔
				//draw_profile1();
				//draw_front_hole1();
				//draw_behind_hole1();
				//draw_left_hole1();
				//draw_right_hole1(); 
				/*添加支架*/  
				draw_left_branch();
				draw_right_branch();
		        /*添加电缆线开始
		         */
		        meshes = L3D.meshes({

		        		wire1 : [[-14, 13, 220], [-14, 13, 0], [-14, 13, -220]],
		        		wire2 : [[-14, 18, 220], [-14, 18, 0], [-14, 18, -220]],
		        		wire3 : [[14, 13, 220], [14, 13 ,0], [14, 13, -220]],
		        		wire4 : [[14, 18, 220], [14, 18 ,0], [14, 18, -220]],

		        	/*
						wire1 :	[[-11, 10, 22], [0, 10, 10], [22, 10, 0], [178, 10, 0], [200, 10, 0]],
						wire2 : [[-22, 13, 0], [0, 12, 0], [22, 13, 0], [178, 13, 0], [200, 12, 0], [222, 13, 0]],
						wire3 : [[-4, 10, 22], [0, 5, 0], [0, 10, -21]],
						
		        		wire4 :	[[189, 10, 22], [200, 10, 10], [222, 10, 0]],
						wire5 : [[178, 13, 0], [200, 12, 0], [222, 13, 0]],
						wire6 : [[196, 10, 22], [200, 5, 0], [200, 10, -21]],
					*/

				}); 
		        
		        scene.add(meshes.wire1);
		        scene.add(meshes.wire2);
		        scene.add(meshes.wire3);
		        //scene.add(meshes.wire4);
		        //scene.add(meshes.wire6);
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

		init();
		animate();
		onWindowResize();
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
