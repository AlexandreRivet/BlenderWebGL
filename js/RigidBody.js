/**
	Class RigidBody
	
	@brief		RigidBody Class for THREE.JS
	@author		Jamal BOUIZEM
	@date		20/04/2015
*/



var RIGIDBODY;


// Tools
function rad(a) { return a * Math.PI / 180; };
function deg(a) { return a * 180 / Math.PI; };
function lerp(a, b, t) { return (1.0 - t) * a + (t * b); }

THREE.Vector3.Lerp = function(u, v, t){
	return new THREE.Vector3(
		lerp(u.x, v.x, t),
		lerp(u.y, v.y, t),
		lerp(u.z, v.z, t)
	);
};

THREE.Vector3.prototype.mul = function(v){
	this.x *= v.x;
	this.y *= v.y;
	this.z *= v.z;
};

// RigidBody class
var RigidBody = (function(){
	'use strict';
	return {
		append: function(spec){
			'use strict';
			spec = spec || {};
			var that = {
				obj: spec.obj,
				scene: spec.scene || null,
				_update: spec.update || false,
				isKinematic: spec.isKinematic,
				box: null,
				velocity: new THREE.Vector3(),
				acceleration: new THREE.Vector3(1.0, 1.0, 1.0),
				angular_velocity: new THREE.Vector3(),
				angular_acceleration: new THREE.Vector3(),
				direction: new THREE.Vector3(0.0, -1.0, 0.0),
				g: 9.81,
				I: Matrix.instance({ order: 4 }),
				boundingBox: null,
				mass: spec.mass || 1.0,
				showBox: false
			};
			
			var update_interval = 0;
			
			that.compute = function(){
				that.obj.geometry.computeBoundingBox();
				that.box = new THREE.BoundingBoxHelper(that.obj, "green");
				that.scene.add(that.box);
			};
			
			that.update = function(){
				if(that.showBox)
				{
					that.box.update();
				}
				if(that.isKinematic === false)
				{
					that.velocity.mul(that.acceleration);
					var dir = that.direction.clone();
					dir.mul(new THREE.Vector3(that.mass / that.g, that.mass / that.g, that.mass / that.g));
					that.velocity.add(dir);
					that.obj.position.add(that.velocity);
				}
			};
			
			update_interval = setInterval(function(){
				if(that._update)
				{
					that.update();
				}
			}, 16);
			
			that.compute();
			that.obj.rigidBody = that;
		},
		
		appendToScene: function(scene, update){
			'use strict';
			for(var i = 0; i < scene.children.length; ++i)
			{
				RigidBody.append({ obj: scene.children[i], update: update, isKinematic: true });
			}
		}
	}
})();

// Matrix class
var Matrix = (function(){
	'use strict';
	return {
		instance: function(spec){
			'use strict';
			spec = spec || {};
			var that = {
				values: new Array()
			};
			
			var order = spec.order || 4;
			
			function coord(index, width){
				return new THREE.Vector2(index%width, parseInt(index/width));
			}
			
			function index(x, y, width){
				return x + width * y;
			}
			
			that.toString = function(){
				var rslt = "";
				for(var i = 0; i < order * order; ++i){
					var p = coord(i, order);
					
					if(i%order === 0)
					{
						rslt += "\n";
					}
					
					rslt += that.values[i] + "\t";
				}
				return rslt;
			};
			
			that.identity = function(){
				for(var i = 0; i < order * order; ++i){
					var p = coord(i, order);
					
					if(p.x === p.y){
						that.values[i] = 1.0;
					} else {
						that.values[i] = 0.0;
					}
				}
			};
			
			that.add = function(mat){
				for(var i = 0; i < order * order; ++i){
					that.values[i] += mat.values[i];
				}
			};
			
			that.sub = function(mat){
				for(var i = 0; i < order * order; ++i){
					that.values[i] -= mat.values[i];
				}
			};
			
			that.mul = function(mat){
				for(var i = 0; i < order * order; ++i){
					var p = coord(i, order);
					
					var sum = 0.0;
					for(var j = 0; j < order; ++j){
						var ind = index(p.x, j, order);
						sum += that.values[i] * mat.values[ind];
					}
					
					that.values[i] = sum;
				}
			};
			
			that.mulv = function(v){
				if(order !== 3 && order !== 4){
					return false;
				}
				
				return new THREE.Vector3(
					v.x * that.values[0] + v.y * that.values[1] + v.z * that.values[2],
					v.x * that.values[4] + v.y * that.values[5] + v.z * that.values[6],
					v.x * that.values[8] + v.y * that.values[9] + v.z * that.values[10]
				);
			};
			
			that.neg = function(){
				for(var i = 0; i < order * order; ++i){
					that.values[i] = -that.values[i];
				}
			};
			
			that.identity();
			return that;
		},
		
		TranslationX: function(val){
			val = val || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[3] += val;
			
			return that;
		},
		
		TranslationY: function(val){
			val = val || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[7] += val;
			
			return that;
		},
		
		TranslationZ: function(val){
			val = val || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[11] += val;
			
			return that;
		},
		
		Translation: function(v){
			v = v || new THREE.Vector3();
			var that = Matrix.instance({ order: 4 });
			
			that.values[3] += v.x;
			that.values[7] += v.y;
			that.values[11] += v.z;
			
			return that;
		},
		
		ScaleX: function(val){
			val = val || 1;
			var that = Matrix.instance({ order: 4 });
			
			that.values[0] *= val;
			
			return that;
		},
		
		ScaleY: function(val){
			val = val || 1;
			var that = Matrix.instance({ order: 4 });
			
			that.values[5] *= val;
			
			return that;
		},
		
		ScaleZ: function(val){
			val = val || 1;
			var that = Matrix.instance({ order: 4 });
			
			that.values[10] *= val;
			
			return that;
		},
		
		Scale: function(v){
			v = v || new THREE.Vector3();
			var that = Matrix.instance({ order: 4 });
			
			that.values[0] *= v.x;
			that.values[5] *= v.y;
			that.values[10] *= v.z;
			
			return that;
		},
		
		RotationX: function(alpha){
			alpha = alpha || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[5] = Math.cos(alpha);
			that.values[6] = -Math.sin(alpha);
			that.values[9] = Math.sin(alpha);
			that.values[10] = Math.cos(alpha);
			
			return that;
		},
		
		RotationY: function(alpha){
			alpha = alpha || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[0] = Math.cos(alpha);
			that.values[2] = -Math.sin(alpha);
			that.values[8] = Math.sin(alpha);
			that.values[10] = Math.cos(alpha);
			
			return that;
		},
		
		RotationZ: function(alpha){
			alpha = alpha || 0;
			var that = Matrix.instance({ order: 4 });
			
			that.values[0] = Math.cos(alpha);
			that.values[1] = -Math.sin(alpha);
			that.values[4] = Math.sin(alpha);
			that.values[5] = Math.cos(alpha);
			
			return that;
		}
	}
})();

//	Tests

function MakeMesh(verts, mat)
{
	var faces = [];
	for(var i = 0; i < verts.length; i+=3){ faces.push(new THREE.Face3(i,i+1,i+2)); }
	
	var geo = new THREE.Geometry();
	geo.vertices = verts;
	geo.faces = faces;
	geo.verticesNeedUpdate = true;
	return new THREE.Mesh(geo, mat);
}


RIGIDBODY = RigidBody;