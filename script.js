$(document).ready(function(){
Physics(function(world){

  var viewWidth = 500;
  var viewHeight = 300;

  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    styles: {
        // set colors for the circle bodies
        'circle' : {
            strokeStyle: '#351024',
            lineWidth: 1,
            fillStyle: '#d33682',
            angleIndicator: '#351024'
        }
    }
  });

  // add the renderer
  world.add( renderer );
  // render on each step
  world.on('step', function(){
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.2,
      cof: 0.8
  }));

  // add a circle
  world.add(
      Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
      })
  );
  
	var square = Physics.body('rectangle', {
	    x: 250,
	    y: 250,
	    width: 50,
	    height: 50
	});
world.add( square );

world.add( Physics.body('convex-polygon', {
    x: 250,
    y: 50,
    vx: 0.05,
    vertices: [
        {x: 0, y: 80},
        {x: 60, y: 40},
        {x: 60, y: -40},
        {x: 0, y: -80}
    ]
}) );

world.add( Physics.body('convex-polygon', {
    x: 400,
    y: 200,
    vx: -0.02,
    vertices: [
        {x: 0, y: 80},
        {x: 80, y: 0},
        {x: 0, y: -80},
        {x: -30, y: -30},
        {x: -30, y: 30}
    ]
}) );
world.render();
  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );

  // add some gravity
  world.add( Physics.behavior('constant-acceleration') );
  
	world.add( Physics.behavior('body-collision-detection') );
	
	world.add( Physics.behavior('sweep-prune') );
  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});
})