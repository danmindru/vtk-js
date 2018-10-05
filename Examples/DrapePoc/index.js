/* eslint-disable */
import 'vtk.js/Sources/favicon';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

import vtkTexture from 'vtk.js/Sources/Rendering/Core/Texture';
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader';
import vtkElevationReader from 'vtk.js/Sources/IO/Misc/ElevationReader';
import severn3d from 'vtk.js/Data/severn3d.vtp.txt';
import severn from 'vtk.js/Data/severn.vtp.txt';
import servernDem from 'vtk.js/Data/severn.dem.txt';

import vtkProperty from 'vtk.js/Sources/Rendering/Core/Property';
import vtkPlaneSource from 'vtk.js/Sources/Filters/Sources/PlaneSource';


// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [100/255, 100/255, 100/255],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();


// DEM CSV.
// (() => {
//   const reader = vtkElevationReader.newInstance({
//     origin: [
//       -2.234758634918211,
//       52.037976796468776,
//       0
//     ],
//     xSpacing: 0.01568,
//     ySpacing: 0.01568,
//     zScaling: 0.06666,
//     xDirection: 1,
//     yDirection: -1,
//     requestCount: 0,
//   });
//   const mapper = vtkMapper.newInstance();
//   const actor = vtkActor.newInstance({
//     origin: [
//       -2.234758634918211,
//       52.037976796468776,
//       0
//     ]
//   });

//   mapper.setInputConnection(reader.getOutputPort());
//   actor.setMapper(mapper);

//   renderer.addActor(actor);
//   // renderer.resetCamera();
//   renderWindow.render();

  // Download and apply Texture
  // const img = new Image();
  // img.onload = function textureLoaded () {
  //   const texture = vtkTexture.newInstance();
  //   texture.setInterpolate(true);
  //   texture.setImage(img);
  //   actor.addTexture(texture);
  //   renderWindow.render();
  // };
  // img.src = `${__BASE_PATH__}/data/severn.jpg`;

  // // Download elevation and render when ready
  // reader.setUrl(`${__BASE_PATH__}/data/elevation/dem.csv`).then((a) => {
  //   renderer.resetCamera();
  //   renderWindow.render();
  // });
// })();


// // XML Polydata (Vtp text)
// (() => {
//   const xmlReader = vtkXMLPolyDataReader.newInstance();
//   const xmlMapper = vtkMapper.newInstance();
//   const xmlActor = vtkActor.newInstance();

//   const enc = new TextEncoder();
//   xmlReader.parseAsArrayBuffer(enc.encode(severn3d));

//   xmlMapper.setInputConnection(xmlReader.getOutputPort());
//   xmlActor.setMapper(xmlMapper);

//   renderer.addActor(xmlActor);

//   xmlActor.getProperty()
//     .setRepresentation(1);
//   xmlActor.getProperty()
//     .setEdgeVisibility(true);

//   renderer.resetCamera();
//   renderWindow.render();
// })();

// Flat map
// (() => {
//   const xmlReader = vtkXMLPolyDataReader.newInstance();
//   const xmlMapper = vtkMapper.newInstance();
//   const xmlActor = vtkActor.newInstance();
//   const plane = vtkPlaneSource.newInstance({
//     origin: [
//       0,
//       0,
//       -50
//     ],
//     xResolution: 1,
//     yResolution: 1,
//     point1: [234080, 0, 0],
//     point2: [0, 383477, 0],
//     pointType: 'Float32Array',
//   })

//   const enc = new TextEncoder();
//   xmlReader.parseAsArrayBuffer(enc.encode(severn3d));

//   xmlMapper.setInputConnection(plane.getOutputPort());
//   xmlActor.setMapper(xmlMapper);

//   renderer.addActor(xmlActor);
//   renderer.resetCamera();
//   renderWindow.render();


//   // Download and apply Texture
//   const img = new Image();
//   img.onload = function textureLoaded () {
//     const texture = vtkTexture.newInstance();
//     // texture.setInterpolate(true);
//     // texture.setRepeat(true);
//     // texture.setEdgeClamp(true);
//     texture.setImage(img);

//     // xmlActor.getProperty()
//     //   .setRepresentation(2);
//     xmlActor.getProperty()
//       .setEdgeVisibility(true);

//     xmlActor.addTexture(texture);

//     renderWindow.render();
//   };
//   img.src = `${__BASE_PATH__}/data/severn.jpg`;
//   // img.src = `${__BASE_PATH__}/data/elevation/dem.jpg`;
// })();


// Actual drape
(() => {
  const reader = vtkElevationReader.newInstance({
    // origin: [
    //   384000.00000,
    //   237000.00000,
    //   0
    // ],
    // xSpacing: 0.01568,
    // ySpacing: 0.01568,
    zScaling: -0.03,
    // yDirection: 1
    // xDirection: -1,
    // requestCount: 0,
  });
  const mapper = vtkMapper.newInstance();
  const actor = vtkActor.newInstance();

  mapper.setInputConnection(reader.getOutputPort());
  actor.setMapper(mapper);

  renderer.addActor(actor);
  // renderer.resetCamera();
  renderWindow.render();

  // Download and apply Texture
  const img = new Image();
  img.onload = function textureLoaded () {
    const texture = vtkTexture.newInstance();
    texture.setEdgeClamp(false);
    texture.setImage(img);
    actor.addTexture(texture);
    renderWindow.render();
  };
  img.src = `${__BASE_PATH__}/data/severn-mapbox2.jpg`;

  // Download elevation and render when ready
  // reader.setUrl(`${__BASE_PATH__}/data/elevation/dem.csv`).then((a) => {
  //   renderer.resetCamera();
  //   renderWindow.render();
  // });
  reader.parseAsText(servernDem.replace(/ /g, ','))


  actor.getProperty()
  .setRepresentation(1);
  actor.getProperty()
  .setEdgeVisibility(true);

  console.log(actor.getBounds(), actor.getOrigin())

  renderer.resetCamera();
  renderWindow.render();
})();

// // XML Polydata (Vtp text)
// (() => {
//   const xmlReader = vtkXMLPolyDataReader.newInstance();
//   const xmlMapper = vtkMapper.newInstance();
//   const xmlActor = vtkActor.newInstance();

//   const enc = new TextEncoder();
//   xmlReader.parseAsArrayBuffer(enc.encode(severn));

//   xmlMapper.setInputConnection(xmlReader.getOutputPort());
//   xmlActor.setMapper(xmlMapper);

//   renderer.addActor(xmlActor);

//   xmlActor.getProperty()
//     .setRepresentation(2);
//   xmlActor.getProperty()
//     .setEdgeVisibility(true);

//   console.log(xmlActor.getBounds(), xmlActor.getOrigin())

//   renderer.resetCamera();
//   renderWindow.render();
// })();



// Flat map + mesh on top
// (() => {
//   let meshBounds;

//   // // XML Polydata (Vtp text)
//   (() => {
//     const xmlReader = vtkXMLPolyDataReader.newInstance();
//     const xmlMapper = vtkMapper.newInstance();
//     const xmlActor = vtkActor.newInstance();

//     const enc = new TextEncoder();
//     xmlReader.parseAsArrayBuffer(enc.encode(severn));

//     xmlMapper.setInputConnection(xmlReader.getOutputPort());
//     xmlActor.setMapper(xmlMapper);

//     renderer.addActor(xmlActor);

//     xmlActor.getProperty()
//       .setRepresentation(1);
//     xmlActor.getProperty()
//       .setEdgeVisibility(true);

//     meshBounds = xmlActor.getBounds();

//     renderer.resetCamera();
//     renderWindow.render();
//   })();

//   (() => {
//     const xmlReader = vtkXMLPolyDataReader.newInstance();
//     const xmlMapper = vtkMapper.newInstance();
//     const xmlActor = vtkActor.newInstance();

//     const xMin = meshBounds[0];
//     const xMax = meshBounds[1];
//     const yMin = meshBounds[2];
//     const yMax = meshBounds[3];

//     const plane = vtkPlaneSource.newInstance({
//       origin: [
//         xMin,
//         yMin,
//         0
//       ],
//       xResolution: 1,
//       yResolution: 1,
//       point2: [
//         xMin,
//         yMax,
//         0
//       ],
//       point1: [
//         xMax,
//         yMin,
//         0
//       ],
//       pointType: 'Float32Array',
//     })

//     const enc = new TextEncoder();
//     xmlReader.parseAsArrayBuffer(enc.encode(severn3d));

//     xmlMapper.setInputConnection(plane.getOutputPort());
//     xmlActor.setMapper(xmlMapper);

//     renderer.addActor(xmlActor);
//     renderWindow.render();


//     // Download and apply Texture
//     const img = new Image();
//     img.onload = function textureLoaded () {
//       const texture = vtkTexture.newInstance();
//       // texture.setInterpolate(true);
//       // texture.setRepeat(true);
//       // texture.setEdgeClamp(true);
//       texture.setImage(img);

//       // xmlActor.getProperty()
//       //   .setRepresentation(1);
//       xmlActor.getProperty()
//         .setEdgeVisibility(true);

//       xmlActor.addTexture(texture);

//       renderer.resetCamera();
//       renderWindow.render();
//     };
//     img.src = `${__BASE_PATH__}/data/severn-mapbox3.jpg`;
//     // img.src = `${__BASE_PATH__}/data/elevation/dem.jpg`;

//     console.log(xmlActor.getBounds())
//   })();
// })();
