/*绘制3D工井剖面，管孔，电缆
 **/	
function init(){		
		// Grab our container div
        var container = document.createElement( 'div' );
        document.body.appendChild(container)
 		// Put in a camera
        camera = new THREE.PerspectiveCamera( 70, 1000 / 1000, 1, 1000 );
        //camera.position.set( 0, 20,10 );
        camera.position.y = 0;//设置相机的位置坐标
		camera.position.z = 40;
		//camera.up.y = 20;//设置相机的上为「y」轴方向
		//camera.lookAt( {x:0, y:20, z:0 } );//设置视野的中心坐标
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
		//添加光线
		/*
		var light = new THREE.PointLight( 0xffffff, 1, 200);
		light.position.set(0, 20, 20);
		this.scene.add(light);

		light = new THREE.PointLight( 0xffffff, 1, 200);
		light.position.set(20, 0, 0);
		this.scene.add(light);
*/
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
		
		draw_profile();
		draw_earth();
		draw_front_hole();
		draw_behind_hole();
		draw_left_hole();
		draw_right_hole();
		   
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
	}
	/*添加工井剖面墙
	 * Create a shaded, texture-mapped cube and add it to the scene
       First, create the texture map
	 */
	function draw_profile(){
		var geometry = new THREE.CubeGeometry(1, 40, 40);
        var mapUrl = "images/23.png";
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
    	map.repeat.set(1,1);     
        var material = new THREE.MeshPhongMaterial({ map: map });
        var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-20, 0, 0);
		scene.add( mesh );

		var geometry = new THREE.CubeGeometry(1, 40, 40);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(20, 0, 0);
		scene.add( cube );

		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, -20);
		scene.add( cube );

		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, 20);
		scene.add( cube );	
	}
		
//添加工井地面
	function draw_earth(){
		geometry = new THREE.PlaneGeometry(66, 66, 0, 0);
		var map = THREE.ImageUtils.loadTexture('images/Mercury.jpg');
    	map.repeat.set(1,1);
  	 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
   		material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = -20;
		scene.add( cube );
	}
		
		//添加工井上面
	function draw_upface(){
		geometry = new THREE.PlaneGeometry(0, 0, 0, 0);
		var map = THREE.ImageUtils.loadTexture('images/ball_texture.jpg');
    	map.repeat.set(1,1);
  	 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
   		material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = 40;
		scene.add( cube );
        window.addEventListener( 'resize', onWindowResize, false );  
	}
		
//画工井前剖面规则管孔
	function draw_front_hole(){	
	/*	var pipe_holex = new Array();
		var pipe_holey = new Array();
		var z = 20;
		for(var i=0;i<3;i++){
			pipe_holex[i] = i*3;
			for(var j=0;j<3;j++){
				pipe_holey[j] = j*3+10;
				var geometry = new THREE.CubeGeometry(3, 3, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(pipe_holex[i],pipe_holey[j], z);
				scene.add(mesh);	
			}
		}*/
		var pipe_holex = new Array();
		var pipe_holey = new Array();
		var z = 20;
		var hx = 3;
		var hy = 5;
		var hr = 3;
		var hx_span = 0;
		var hy_span = 0;
		var hx_start = -20;
		var hy_start = 0;

		for(var i=0;i<hy;i++){
			pipe_holey[i] = i*(hy_span + hr);
			var x = hx_start + pipe_holey[i];
			for(var j=0;j<hx;j++){
				pipe_holex[j] = j*(hx_span + hr);
				var y = hy_start + pipe_holex[j]
				var geometry = new THREE.CubeGeometry(hr, hr, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent: true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y, z);
				scene.add(mesh);	
			}
		}
	}
	//画工井后剖面管孔
	function draw_behind_hole(){	
		var pipe_holex = new Array();
		var pipe_holey = new Array();
		var z = -20;
		for(var i=0;i<3;i++){
			pipe_holex[i] = i*3;
			for(var j=0;j<3;j++){
				pipe_holey[j] = j*3+10;
				var geometry = new THREE.CubeGeometry(3, 3, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(pipe_holex[i],pipe_holey[j], z);
				scene.add(mesh);	
			}
		}
	}
	//画工井左面管孔
	function draw_left_hole(){	
		var x = -20;
		var pipe_holey = new Array();
		var pipe_holez = new Array();
		for(var i=0;i<4;i++){
			pipe_holez[i] = i*3;
			for(var j=0;j<3;j++){
				pipe_holey[j] = j*3+10;
				var geometry = new THREE.CubeGeometry(1.1, 3, 3);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x,pipe_holey[j], pipe_holez[i]);
				scene.add(mesh);	
			}
		}
	}
	//画工井右剖面管孔
	function draw_right_hole(){	
		var x = 20;
		var pipe_holey = new Array();
		var pipe_holez = new Array();
		for(var i=0;i<3;i++){
			pipe_holez[i] = i*3;
			for(var j=0;j<3;j++){
				pipe_holey[j] = j*3+10;
				var geometry = new THREE.CubeGeometry(1.1, 3, 3);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x,pipe_holey[j], pipe_holez[i]);
				scene.add(mesh);	
			}
		}
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
		renderer.render( scene, camera );
	}