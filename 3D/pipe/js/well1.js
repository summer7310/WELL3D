/*添加2号工井剖面管孔
*/
//画工井前剖面规则管孔
	function draw_front_hole1(){	
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
		var hy = 4;
		var hr = 3;
		var hx_span = 0;
		var hy_span = 0;
		var hx_start = 190;
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
	function draw_behind_hole1(){	
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
				mesh.position.set(pipe_holex[i]+200,pipe_holey[j], z);
				scene.add(mesh);	
			}
		}
	}
	//画工井左面管孔
	function draw_left_hole1(){	
		var x = 180;
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
	function draw_right_hole1(){	
		var x = 220;
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
	