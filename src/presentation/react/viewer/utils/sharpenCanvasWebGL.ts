import * as twgl from "twgl.js";
import type { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";

// WebGLを使用した先鋭化
export const sharpenCanvasWebGL = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  strength: SharpeningFilterStrength,
): void => {
  const glCanvas = document.createElement("canvas");
  glCanvas.width = canvas.width;
  glCanvas.height = canvas.height;

  const gl = glCanvas.getContext("webgl");
  if (gl == null) return;

  const weight = getWeight(strength);

  const programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
    a_position: {
      numComponents: 2,
      data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
    },
    a_texcoord: {
      numComponents: 2,
      data: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    },
  });
  const texture = twgl.createTexture(gl, {
    src: canvas,
    flipY: 1,
  });

  gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  gl.useProgram(programInfo.program);

  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, {
    u_image: texture,
    u_textureSize: [canvas.width, canvas.height],
    u_centerWeight: weight.center,
    u_neighborWeight: weight.neighbor,
  });
  twgl.drawBufferInfo(gl, bufferInfo);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(glCanvas, 0, 0);
};

const getWeight = (
  strength: SharpeningFilterStrength,
): Readonly<{ center: number; neighbor: number }> => {
  const base = 0.1;
  return {
    center: base * strength * 4 + 1,
    neighbor: -base * strength,
  };
};

const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;

  varying vec2 v_texcoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_textureSize;
  uniform float u_centerWeight;
  uniform float u_neighborWeight;

  varying vec2 v_texcoord;

  void main() {
    vec2 texel = 1.0 / u_textureSize;
    vec4 center = texture2D(u_image, v_texcoord);

    vec3 rgb =
    center.rgb * u_centerWeight
      + texture2D(u_image, v_texcoord + vec2(-texel.x, 0.0)).rgb * u_neighborWeight
      + texture2D(u_image, v_texcoord + vec2( texel.x, 0.0)).rgb * u_neighborWeight
      + texture2D(u_image, v_texcoord + vec2(0.0, -texel.y)).rgb * u_neighborWeight
      + texture2D(u_image, v_texcoord + vec2(0.0,  texel.y)).rgb * u_neighborWeight;

    gl_FragColor = vec4(rgb, center.a);
  }
`;
