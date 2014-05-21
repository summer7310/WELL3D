/*绘制3D工井剖面，管孔，电缆
 **/	
/**
 * 根据工井长length,宽width,井顶深tpdepth,井底深btdepth,生成三维剖面
 * @param {[type]} req
 */
	var Draw_profile = function(req){
		req['width'] = req['width']?req['width']:0;
		req['length'] = req['length']?req['length']:0;
		req['tpdepth'] = req['tpdepth']?req['tpdepth']:0;
		req['btdepth'] = req['btdepth']?req['btdepth']:0;
		width = req['width'];
		height = req['tpdepth']+req['btdepth'];
		length = req['length'];
		length1 = req['length']/2;
		console.log(length1)
		width1 = req['width']/2;
		var geometry = new THREE.CubeGeometry(1, height, width);
		var mapUrl = "images/23.png";
		var map = THREE.ImageUtils.loadTexture(mapUrl);
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.repeat.set(1,1);    
		//前 
		var material = new THREE.MeshPhongMaterial({ map: map });
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-length1, 0, 0);
		scene.add( mesh );
		//后
		var geometry = new THREE.CubeGeometry(1, height, width);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(length1, 0, 0);
		scene.add( cube );
		//左
		var geometry = new THREE.CubeGeometry(length, height, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, -width1);
		scene.add( cube );
		//右
		var geometry = new THREE.CubeGeometry(length, height, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, width1);
		scene.add( cube );	
		//添加工井地面
		geometry = new THREE.PlaneGeometry(66, 66, 20, 20);
		var map = THREE.ImageUtils.loadTexture('images/Mercury.jpg');
		map.repeat.set(1,1);
		 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
			material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = -height/2;
		scene.add( cube );
	};
	