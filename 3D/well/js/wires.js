/*
 * 电缆线功能封装
 */
var L3D = {};

/*
 * 基本参数
 */
//线缆材质
L3D.normalColor = 0x000000;
L3D.highColor = 0xff0000;

L3D.material = {
	color: L3D.normalColor,
	wireframe: false, 
	transparent: true
}

/*
 * 根据坐标数组生成一条线段路径
 * 传入2维数组
 */
L3D.path = function(pos){
	var vectors = new Array();
	for(v in pos){
		vectors[v] = new THREE.Vector3(
				pos[v][0], 
				pos[v][1],
				pos[v][2]
		);
	}
	return new THREE.SplineCurve3(vectors);
}

/*
 * 由路径生成3D对象
 */
L3D.geometry = function(path){
	return new THREE.TubeGeometry(
		path, 
		30, 
		0.5, 
		6/*circle line*/, 
		false 
	);
}

/*
 * 由3D对象生成电缆线网格
 */
L3D.mesh = function(geo){
	return new THREE.Mesh(geo, new THREE.MeshPhongMaterial(
			L3D.material
	));
}

/*
 * 由JSON数组生成电缆网格组
 */
L3D.meshes = function(data){
	var meshes = {};
	for(key in data){
		var path = L3D.path(data[key]);
		var geo = L3D.geometry(path);
		var mesh = L3D.mesh(geo);
		meshes[key] = mesh;
	}
	return meshes;
}

/*
 * 高亮制定电缆段
 * 参数为NAME和操作电缆网格对象组
 */
L3D.highLight = function(name, meshes){
	L3D.unhighLight(meshes);
	meshes[name].material.setValues({
		color :	L3D.highColor
	});
}

L3D.unhighLight = function(meshes){
	for(id in meshes ){
		meshes[id].material.setValues({
			color : L3D.normalColor
		});
	}
}

L3D.menu = {};

/*
 * 绑定电缆到列表点击事件
 */
L3D.menu.highLight = function(meshes){
	$('#list').find('ul').find('li').click(function(){
			var key = $(this).attr('class');
			L3D.highLight(key, meshes)
	});
}

