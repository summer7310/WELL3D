/*绘制3D工井剖面
 **/	
/**
 * 添加排管断面（宽）SECTION_SIZE_WIDTH,断面（高）SECTION_SIZE_HEIGHT,管道长度：wlength,
 * 绘制地下管沟的相应起始工井和终点工井
 * 根据工井长length,宽width,井顶深tpdepth,井底深btdepth,生成三维工井
 * @param {[type]} req
 */
	var Draw_start_well = function(req){
		req['wwidth'] = req['wwidth']?req['wwidth']:0;
		req['wlength'] = req['wlength']?req['wlength']:0;
		req['tpdepth'] = req['tpdepth']?req['tpdepth']:0;
		req['btdepth'] = req['btdepth']?req['btdepth']:0;
		wwidth = req['wwidth'];
		wheight = req['tpdepth']+req['btdepth'];
		wlength = req['wlength'];
		length1 = req['wlength']/2;
		console.log(length1)
		width1 = req['wwidth']/2;
		pwidth = req['SECTION_SIZE_WIDTH'];
		pheight = req['SECTION_SIZE_HEIGHT'];
		plength = req['plength'];
		var geometry = new THREE.CubeGeometry(1, wheight, wwidth);
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
		var geometry = new THREE.CubeGeometry(1, wheight, wwidth);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(length1, 0, 0);
		scene.add( cube );
		//左
		var geometry = new THREE.CubeGeometry(wlength, wheight, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, -width1);
		scene.add( cube );
		//右
		var geometry = new THREE.CubeGeometry(wlength, wheight, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, width1);
		scene.add( cube );	
		
	};

	var Draw_end_well = function(req){
		req['wwidth'] = req['wwidth']?req['wwidth']:0;
		req['wlength'] = req['wlength']?req['wlength']:0;
		req['tpdepth'] = req['tpdepth']?req['tpdepth']:0;
		req['btdepth'] = req['btdepth']?req['btdepth']:0;
		wwidth = req['wwidth'];
		wheight = req['tpdepth']+req['btdepth'];
		wlength = req['wlength'];
		length1 = req['wlength']/2;
		console.log(length1)
		width1 = req['wwidth']/2;
		var geometry = new THREE.CubeGeometry(1, wheight, wwidth);
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
		var geometry = new THREE.CubeGeometry(1, wheight, wwidth);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(length1, 0, 0);
		scene.add( cube );
		//左
		var geometry = new THREE.CubeGeometry(wlength, wheight, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, -width1);
		scene.add( cube );
		//右
		var geometry = new THREE.CubeGeometry(wlength, wheight, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, width1);
		scene.add( cube );			
	};
	