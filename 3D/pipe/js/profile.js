/*绘制3D工井剖面，管孔，电缆
 **/	

	/*添加1号工井剖面墙
	 * Create a shaded, texture-mapped cube and add it to the scene
       First, create the texture map
	 */
	function draw_profile(){
		/*左剖面
		*/
		var geometry = new THREE.CubeGeometry(1, 40, 700);
        var mapUrl = "images/23.png";
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
    	map.repeat.set(1,1);     
        var material = new THREE.MeshPhongMaterial({ map: map });
        var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-20, 20, 0);
		scene.add( mesh );
		/*右剖面*/
		var geometry = new THREE.CubeGeometry(1, 40, 700);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(20, 20, 0);
		scene.add( cube );
		/*后*/
		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 20, -210);
		scene.add( cube );
		/*前*/
		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 20, 400);
		scene.add( cube );	
	}
	/*添加2号另工井剖面墙
	 * Create a shaded, texture-mapped cube and add it to the scene
       First, create the texture map
	 */
	function draw_profile1(){
		var geometry = new THREE.CubeGeometry(1, 40, 40);
        var mapUrl = "images/23.png";
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
    	map.repeat.set(1,1);     
        var material = new THREE.MeshPhongMaterial({ map: map });
        var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(180, 20, 0);
		scene.add( mesh );

		var geometry = new THREE.CubeGeometry(1, 40, 40);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(220, 20, 0);
		scene.add( cube );

		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(200, 20, -20);
		scene.add( cube );

		var geometry = new THREE.CubeGeometry(40, 40, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(200, 20, 20);
		scene.add( cube );	
	}		
//添加工井地面
	function draw_earth(){
		geometry = new THREE.PlaneGeometry( 41, 800, 100, 100 );
		var map = THREE.ImageUtils.loadTexture('images/earth.png');
    	map.repeat.set(1,1);
  	 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
   		material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = -.01;
		scene.add( cube );
	}
		
		//添加工井上面
	function draw_upface(){
		geometry = new THREE.PlaneGeometry(41, 800, 50, 50);
		var map = THREE.ImageUtils.loadTexture('images/23.png');
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
		var z = 200;
		var hx = 3;
		var hy = 4;
		var hr = 3;
		var hx_span = 0;
		var hy_span = 0;
		var hx_start = -10;
		var hy_start = 10;
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
		var z = -210;
		for(var i=-1;i<4;i++){
			pipe_holex[i] = i*3;
			for(var j=0;j<5;j++){
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
		var x = -30;
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
	//画工井右剖面管孔
	function draw_right_hole(){	
		var x = 30;
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
	