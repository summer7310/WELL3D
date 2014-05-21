 /**
 * 根据剖面管孔行数pholex,列数pholey,起始行pholex_start,起始列pholey_start
 * 行间pholex_span,列间pholey_sapn,直径pholed,生成三维管孔
 * 
 * @param {[type]} req
 */
	//画工井前剖面规则管孔	
	var Draw_front_hole = function(req){
		req['pholex'] = req['pholex']?req['pholex']:0;
		hx = req['pholex'];
		hy = req['pholey'];
		hx_start = req['pholex_start'];
		hy_start = req['pholey_start'];
		hy_span = req['pholex_span'];
		hx_span = req['pholey_span'];
		hd = req['pholed'];
		z = -length/2;

		var pipe_holex = new Array();
		var pipe_holey = new Array();

		for(var i=0;i<hy;i++){
			pipe_holey[i] = i*(hy_span + hd);
			var x = hx_start + pipe_holey[i];
			for(var j=0;j<hx;j++){
				pipe_holex[j] = j*(hx_span + hd);
				var y = hy_start + pipe_holex[j]
				var geometry = new THREE.CubeGeometry(hd, hd, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent: true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y, z);
				scene.add(mesh);	
			}
		}
	};	
		
	
	//画工井后剖面管孔
	var Draw_behind_hole = function(req){
		req['pholex'] = req['pholex']?req['pholex']:0;
		hx = req['pholex'];
		hy = req['pholey'];
		hx_start = req['pholex_start'];
		hy_start = req['pholey_start'];
		hy_span = req['pholex_span'];
		hx_span = req['pholey_span'];
		hd = req['pholed'];
		z = length/2;

		var pipe_holex = new Array();
		var pipe_holey = new Array();

		for(var i=0;i<hy;i++){
			pipe_holey[i] = i*(hy_span + hd);
			var x = hx_start + pipe_holey[i];
			for(var j=0;j<hx;j++){
				pipe_holex[j] = j*(hx_span + hd);
				var y = hy_start + pipe_holex[j]
				var geometry = new THREE.CubeGeometry(hd, hd, 1.1);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent: true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y, z);
				scene.add(mesh);	
			}
		}
	};
	//画工井左面管孔
	var Draw_left_hole = function(req){
		req['pholex'] = req['pholex']?req['pholex']:0;
		hy = req['pholex'];
		hx = req['pholey'];
		hx_start = req['pholex_start'];
		hy_start = req['pholey_start'];
		hx_span = req['pholex_span'];
		hy_span = req['pholey_span'];
		hd = req['pholed'];
		x = -width/2;

		var pipe_holex = new Array();
		var pipe_holey = new Array();

		for(var i=0;i<hy;i++){
			pipe_holey[i] = i*(hy_span + hd);
			var y = hx_start + pipe_holey[i];
			for(var j=0;j<hx;j++){
				pipe_holex[j] = j*(hx_span + hd);
				var z = hy_start + pipe_holex[j]
				var geometry = new THREE.CubeGeometry(1.1, hd, hd);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent: true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y, z);
				scene.add(mesh);	
			}
		}
	};
	//画工井右剖面管孔
	var Draw_right_hole = function(req){
		req['pholex'] = req['pholex']?req['pholex']:0;
		hy = req['pholex'];
		hx = req['pholey'];
		hx_start = req['pholex_start'];
		hy_start = req['pholey_start'];
		hx_span = req['pholex_span'];
		hy_span = req['pholey_span'];
		hd = req['pholed'];
		x = width/2;

		var pipe_holex = new Array();
		var pipe_holey = new Array();

		for(var i=0;i<hy;i++){
			pipe_holey[i] = i*(hy_span + hd);
			var y = hx_start + pipe_holey[i];
			for(var j=0;j<hx;j++){
				pipe_holex[j] = j*(hx_span + hd);
				var z = hy_start + pipe_holex[j]
				var geometry = new THREE.CubeGeometry(1.1, hd, hd);
				var map = THREE.ImageUtils.loadTexture('images/12.png');
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent: true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y, z);
				scene.add(mesh);	
			}
		}
	};