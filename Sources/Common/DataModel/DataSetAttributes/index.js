import * as macro from '../../../macro';

/* eslint-disable no-unused-vars */
// Needed so the VTK factory is filled with them
import vtkDataArray from '../../../Common/Core/DataArray';
// import vtkStringArray from '../../../Common/Core/vtkStringArray';

import vtk from '../../../vtk';

// ----------------------------------------------------------------------------
// vtkDataSetAttributes methods
// ----------------------------------------------------------------------------

function vtkDataSetAttributes(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkDataSetAttributes');

  publicAPI.getScalars = () => {
    const array = model.arrays[model.activeScalars];
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.getVectors = () => {
    const array = model.arrays[model.activeVectors];
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.getNormals = () => {
    const array = model.arrays.Normals;
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.getTCoords = () => {
    const array = model.arrays.TCoords; // FIXME is it the right array name?
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.getGlobalIds = () => {
    const array = model.arrays[model.activeGlobalIds];
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.getPedigreeIds = () => {
    const array = model.arrays[model.activePedigreeIds];
    if (array) {
      return array;
    }
    return null;
  };

  publicAPI.addArray = array => {
    if (model.arrays[array.getName()]) {
      throw new Error('Array with same name already exist', array, model.arrays);
    }
    model.arrays[array.getName()] = array;
    publicAPI.modified();
  };

  publicAPI.removeArray = (name) => {
    const array = model.arrays[name];
    delete model.arrays[name];
    publicAPI.modified();
    return array;
  };

  publicAPI.getArrayNames = () => Object.keys(model.arrays);
  publicAPI.getArray = name => model.arrays[name];

  // Process dataArrays if any
  if (model.dataArrays && Object.keys(model.dataArrays).length) {
    Object.keys(model.dataArrays).forEach(name => {
      if (!model.dataArrays[name].ref && model.dataArrays[name].dataType === 'vtkDataArray') {
        publicAPI.addArray(vtkDataArray.newInstance(model.dataArrays[name]));
      }
    });
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  activeScalars: '',
  activeVectors: '',
  activeTensors: '',
  activeGlobalIds: '',
  activePedigreeIds: '',
  arrays: null,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Object methods
  macro.obj(publicAPI, model);
  macro.setGet(publicAPI, model, [
    'activeScalars',
    'activeVectors',
    'activeTensors',
    'activeGlobalIds',
    'activePedigreeIds',
  ]);

  if (!model.arrays) {
    model.arrays = {};
  }

  // Object specific methods
  vtkDataSetAttributes(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkDataSetAttributes');

// ----------------------------------------------------------------------------

export default { newInstance, extend };