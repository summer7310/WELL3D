/*添加工井支架
*/	
	//画工井左面支架
	function draw_left_branch(){	
		var x = -15;
		var branchy = new Array();
		var branchz = new Array();
		for(var i=0;i<2;i++){
			branchz[i] = i*10;
			for(var j=0;j<5;j++){
				branchy[j] = j*5+12;
				var geometry = new THREE.CubeGeometry(7, 1, 1);
				var map = THREE.ImageUtils.loadTexture('images/branch.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x,branchy[j], branchz[i]);
				scene.add(mesh);	
			}
		}
	}
	//画工井右剖面支架
	function draw_right_branch(){	
		var x = 15;
		var branchy = new Array();
		var branchz = new Array();
		for(var i=-20;i<25;i++){
			branchz[i] = i*10;
			for(var j=0;j<5;j++){
				branchy[j] = j*5+12;
				var geometry = new THREE.CubeGeometry(7, 1, 1);
				var map = THREE.ImageUtils.loadTexture('images/branch.png');
		    	map.wrapS = map.wrapT = THREE.RepeatWrapping;
		   		map.repeat.set(1,1);
				var material = new THREE.MeshLambertMaterial({ map : map,transparent:true});
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x,branchy[j], branchz[i]);
				scene.add(mesh);	
			}
		}
	}
	
	
