import React from "react";
import parse from "html-react-parser";
import GltfModel from "../../layouts/GltfModel";
import Slide from "../../layouts/Slide";

const ICEngine3DModel = () => {
  const html = `
<h1 className='text-center fw-bold'> Internal Combustion Engine</h1>
`;
  const assemble = {
    pitch: 3.9375,
    yaw: 24.25,
    pivotX: 1.6890270934655227e-7,
    pivotY: 0.24767144889937961,
    pivotZ: 0.06445496684113944,
    zoom: 16.56
  };
  const disassemble = {
    pitch: 20.25,
    yaw: 22.25,
    pivotX: 1.6890270934655227e-7,
    pivotY: 0.24767144889937961,
    pivotZ: 0.06445496684113944,
    zoom: -24.0
  };

  return (
    <Slide>
      <GltfModel
        text={parse(html)}
        media_type="gltf"
        path={"/app/p2/models/V_Shape_IC_ENGINE.glb"}
        annotation_url={"/app/p2/models/V_Shape_IC_ENGINE.json"}
        envmap={"/app/p2/studio_small_08_1k.hdr"}
        class_name={"view3d-3by2 gltf-model ICEngine3DModel"}
        exposure={2}
        setDefaultPose={[
          { assemble: { assemble } },
          { disassemble: { disassemble } }
        ]}
      />
    </Slide>
  );
};

export default ICEngine3DModel;
