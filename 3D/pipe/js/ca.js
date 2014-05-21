/**
 * 初始化3D场景，包括容器，相机，控制，渲染，光线，帆布的添加
 * 调用画3d剖面和管孔
 * @return {[type]}
 */
	var Init = function(req, req1 ){		
		// Grab our container div
	    var container = document.createElement( 'div' );
        document.body.appendChild(container)
        //设置相机
        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 1000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
        camera.position.y = 20;//设置相机的位置坐标
        camera.position.z = 30;
        camera.up.y = 0;//设置相机的上为「y」轴方向
        camera.lookAt( {x:0, y:20, z:0 } );//设置视野的中心坐标
		//鼠标控制				
        controls = new THREE.OrbitControls( camera );
        controls.noZoom = true;
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
		//设置光源
		var light = new THREE.DirectionalLight( 0xffffff, 1.5 );//设置平行光源
	    light.position.set( 1, 1, 1 );//设置光源向量
		this.scene.add( light );// 追加光源到场景

		var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
		light.position.set( -1, - 0.5, -1 );
		this.scene.add( light );
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
		
		var draw_pipe = new Draw_pipe(req);
		//var draw_start_well = new Drwa_(req1);
		
		   
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