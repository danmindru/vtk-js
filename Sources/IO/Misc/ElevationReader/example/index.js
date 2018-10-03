import 'vtk.js/Sources/favicon';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkElevationReader from 'vtk.js/Sources/IO/Misc/ElevationReader';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkTexture from 'vtk.js/Sources/Rendering/Core/Texture';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [1, 1, 1],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const reader = vtkElevationReader.newInstance({
  xSpacing: 0.01568,
  ySpacing: 0.01568,
  zScaling: 0.06666,
});
const mapper = vtkMapper.newInstance();
const actor = vtkActor.newInstance();

mapper.setInputConnection(reader.getOutputPort());
actor.setMapper(mapper);

renderer.addActor(actor);
renderer.resetCamera();
renderWindow.render();

// Download and apply Texture
const img = new Image();
img.onload = function textureLoaded() {
  const texture = vtkTexture.newInstance();
  texture.setInterpolate(true);
  texture.setImage(img);
  actor.addTexture(texture);
  renderWindow.render();
};
img.src = `${__BASE_PATH__}/data/elevation/dem.jpg`;

// Download elevation and render when ready
reader.setUrl(`${__BASE_PATH__}/data/elevation/dem.csv`).then((a) => {
  renderer.resetCamera();
  renderWindow.render();
});

function loadMesh() {
  const reader2 = vtkElevationReader.newInstance({
    xSpacing: 0.01568,
    ySpacing: 0.01568,
    zScaling: 0.06666,
  });
  const mapper2 = vtkMapper.newInstance();
  const actor2 = vtkActor.newInstance();

  mapper2.setInputConnection(reader2.getOutputPort());
  actor2.setMapper(mapper2);

  renderer.addActor(actor2);
  renderWindow.render();

  reader2.setUrl(`${__BASE_PATH__}/data/elevation/dem.csv`).then((a) => {
    renderer
      .getActors()[1]
      .getProperty()
      .setRepresentation(1);

    renderWindow.render();
  });
}

const button = document.createElement('button');
button.innerText = 'Show mesh';
button.style.cssText = `
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
`;
button.addEventListener('click', () => {
  loadMesh();
});

const topbar = document.createElement('img');
topbar.src = `${__BASE_PATH__}/data/elevation/topbar.png`;
topbar.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
`;

document.querySelector('body').appendChild(topbar);
document.querySelector('body').appendChild(button);
// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.reader = reader;
global.mapper = mapper;
global.actor = actor;
global.renderer = renderer;
global.renderWindow = renderWindow;
