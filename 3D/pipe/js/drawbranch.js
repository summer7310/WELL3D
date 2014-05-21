/**
 * 
 * 添加支架，支架横向数量：bracket_number,纵向数量：bracket_vertical_num,
 * 支架横向间隔：b_horizontal_interval,纵向间隔：b_vertical_interval,规格：bracket_model
 * 支架长：blength,支架宽：bwidth,支架厚：bheight,
 * @return {[type]} [description]
 */ 
    //画工井左面支架
    var Draw_left_branch = function(req){
    	bnumber = req['bracket_number'];
    	bvnum = 
    	bhinterval = req['bracket_horizontal_interval'];
    	bvinterval = req['bracket_vertical_interval'];
    	blength = ['blength'];
    	bwidth = ['bwidth'];
    	bheight = ['bheight'];
    	var x = -width/2;
		var branchy = new Array();
		var branchz = new Array();
		for(var i=0;i<25;i++){
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
    };
   

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