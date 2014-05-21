/**
 * 添加排管断面（宽）SECTION_SIZE_WIDTH,断面（高）SECTION_SIZE_HEIGHT,管道长度：LENGTH,
 * @param {[type]} req [description]
 */
	var Draw_pipe = function (req ){
		/*左剖面
		*/
		width = req['SECTION_SIZE_WIDTH'];
		height = req['SECTION_SIZE_HEIGHT'];
		length = req['length'];
		var geometry = new THREE.CubeGeometry(1, height, length);
        var mapUrl = "images/23.png";
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
    	map.repeat.set(1,1);     
        var material = new THREE.MeshPhongMaterial({ map: map });
        var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-width/2, height/2, 0);
		scene.add( mesh );
		/*右剖面*/
		var geometry = new THREE.CubeGeometry(1, height, length);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(width/2, height/2, 0);
		scene.add( cube );
		/*前*/
		var geometry = new THREE.CubeGeometry(width, height, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, height/2, -length/2);
		scene.add( cube );
		/*后*/
		var geometry = new THREE.CubeGeometry(width, height, 1);
		var material = new THREE.MeshLambertMaterial({ map : map});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, height/2, length/2);
		scene.add( cube );	
		//添加工井地面
		geometry = new THREE.PlaneGeometry( width+1, length, 100, 100 );
		var map = THREE.ImageUtils.loadTexture('images/earth.png');
    	map.repeat.set(1,1);
  	 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
   		material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = -.01;
		scene.add( cube );	
		//添加工井上面
		geometry = new THREE.PlaneGeometry(41, 800, 50, 50);
		var map = THREE.ImageUtils.loadTexture('images/23.png');
    	map.repeat.set(1,1);
  	 	map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
   		material = new THREE.MeshLambertMaterial({ambient:0xffffff, map : map});
		cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = -Math.PI / 2;
		cube.position.y = height;
		scene.add( cube );
        /**
		 * 
		 * 添加支架，支架纵向数量：bracket_number,横向数量：bracket_horizontal_num,
		 * 支架横向间隔：b_horizontal_interval,纵向间隔：b_vertical_interval,规格：bracket_model
		 * 支架长：blength,支架宽：bwidth,支架厚：bheight,
		 * @return {[type]} [description]
		 */ 
        bstart = req['bracket_start'];//支架起始点
    	bvnum = req['bracket_number']/2;
    	bhinterval = req['bracket_horizontal_interval'];
    	bvinterval = req['bracket_vertical_interval'];
    	bhnum = length/bhinterval;//计算横向支架数量，由排管长度除以横向支架间隔得到，横向支架间隔数量一定。
    	blength = req['blength'];//支架长
    	bwidth = req['bwidth'];//支架宽
    	bheight = req['bheight'];//支架厚
    	var leftx = -width/2+4;
    	var rightx = width/2-4;
		var branchy = new Array();
		var branchz = new Array();
		for(var i=0;i<bhnum;i++){
			branchz[i] = -length/2+i*bhinterval;
			for(var j=0;j<bvnum;j++){
				//画排管左面支架
				branchy[j] = j*bvinterval+bstart;
				var geometry = new THREE.CubeGeometry(blength, bheight, bwidth);
				var map = THREE.ImageUtils.loadTexture('images/branch.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(leftx,branchy[j], branchz[i]);
				scene.add(mesh);
				//画排管右剖面支架
				var geometry = new THREE.CubeGeometry(blength, bheight, bwidth);
				var map = THREE.ImageUtils.loadTexture('images/branch.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(rightx,branchy[j], branchz[i]);
				scene.add(mesh);
			}
		}   	
	};

