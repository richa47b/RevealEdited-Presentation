import { EffectComposer } from 'three/examples/jsm/postprocessing//EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing//RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing//ShaderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing//OutlinePass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import * as THREE from 'three'
let composer = null,
  outlinePass = null
let mesh = null,
  isRender = false
export function setMesh(mobj) {
  mesh = mobj
  if (mesh === null && outlinePass !== null) {
    outlinePass.selectedObjects = []
    return
  }
}
export function setRender(render) {
  isRender = render
}

export const PostProcessingOutline = (scene, camera, renderer) => {
  composer = new EffectComposer(renderer)

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  )
  composer.addPass(outlinePass)
  outlinePass.visibleEdgeColor.setHex(0xbc264b)
  outlinePass.hiddenEdgeColor.setHex(0xbc264b)
  outlinePass.edgeStrength = 30
  outlinePass.edgeThickness = 5
  window.addEventListener('resize', onWindowResize)

  if (mesh === null) {
    outlinePass.selectedObjects = []
    return
  } else {
    outlinePass.selectedObjects = mesh
  }
  let gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
  composer.addPass(gammaCorrectionPass)

  function onWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight

    composer.setSize(width, height)
  }
}

export function animate() {
  if (composer !== null && isRender) {
    composer.render()
  }
}
