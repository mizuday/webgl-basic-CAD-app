function handleMousePolygon(event, mode, interactionType){
  if (mode == "draw"){
    if (interactionType == "mouse-down"){
      const pos = getCursorPos(event);
      data["polygon"]["vertices"].push(initVertexArray(pos.x, pos.y, inputPolygonNode.value));
      data["polygon"]["colors"].push(initColorArray(shapeColor, inputPolygonNode.value));
    }
    else if (interactionType == "mouse-move"){
      const pos = getCursorPos(event);
        
      var posXAwal = data["polygon"]["vertices"]
      [data["polygon"]["vertices"].length - 1][0];
      var posYAwal = data["polygon"]["vertices"]
      [data["polygon"]["vertices"].length - 1][1];
      
      for (var i = 2; i < data["polygon"]["vertices"][
        data["polygon"]["vertices"].length - 1
      ].length; i+=2) {
        var prevPoint = data["polygon"]["vertices"][
        data["polygon"]["vertices"].length - 1];
        var newPoint = rotate(posXAwal-pos.x,posYAwal-pos.y,prevPoint[i-2],prevPoint[i-1],360/inputPolygonNode.value);
        data["polygon"]["vertices"][
          data["polygon"]["vertices"].length - 1
        ][i] = newPoint.x;
        data["polygon"]["vertices"][
          data["polygon"]["vertices"].length - 1
        ][i+1] = newPoint.y;
      }
      
      render();
    }
  }

  else if (mode == "move-point"){
    
  }
}

function renderPolygons(shader){
    // Polygon
  let polygonVertexBuffer = fillBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(data["polygon"]["vertices"].flat(2))
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, polygonVertexBuffer);
  activateAttr(shader, "vPosition", 2);

  let polygonColorBuffer = fillBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(data["polygon"]["colors"].flat(2))
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, polygonColorBuffer);
  activateAttr(shader, "vColor", 4);

  var countVert = 0;
  if (data["polygon"]["vertices"].length != 0) {
    for (var i = 0; i < data["polygon"]["vertices"].length; i++) {
      const polygonVert = data["polygon"]["vertices"][i].length/2;
      // console.log(polygonVert);
      gl.drawArrays(gl.TRIANGLE_FAN, countVert, polygonVert);
      countVert += polygonVert;
    }
  }

}