import * as twgl from "twgl.js";

/** WebGLを使用した明度の反転 */
export const invertLightnessWebGL = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): void => {
  const glCanvas = document.createElement("canvas");
  glCanvas.width = canvas.width;
  glCanvas.height = canvas.height;

  const gl = glCanvas.getContext("webgl");
  if (gl == null) return;

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
  twgl.setUniforms(programInfo, { u_image: texture });
  twgl.drawBufferInfo(gl, bufferInfo);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(glCanvas, 0, 0);
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

varying vec2 v_texcoord;

vec3 rgbToHsv(vec3 rgb) {
  float maxValue = max(rgb.r, max(rgb.g, rgb.b));
  float minValue = min(rgb.r, min(rgb.g, rgb.b));
  float diff = maxValue - minValue;

  float h = 0.0;
  if (diff != 0.0) {
    if (maxValue == rgb.r) {
      h = (rgb.g - rgb.b) / diff;
      if (h < 0.0) {
        h += 6.0;
      }
    } else if (maxValue == rgb.g) {
      h = (rgb.b - rgb.r) / diff + 2.0;
    } else {
      h = (rgb.r - rgb.g) / diff + 4.0;
    }
  }

  float s = maxValue == 0.0 ? 0.0 : diff / maxValue;
  return vec3(h, s, maxValue);
}

vec3 hsvToRgb(vec3 hsv) {
  float h = hsv.x;
  float s = hsv.y;
  float v = hsv.z;

  float chroma = s * v;
  float intermediate = chroma * (1.0 - abs(mod(h, 2.0) - 1.0));
  float offset = v - chroma;

  if (h < 1.0) {
    return vec3(chroma, intermediate, 0.0) + offset;
  } else if (h < 2.0) {
    return vec3(intermediate, chroma, 0.0) + offset;
  } else if (h < 3.0) {
    return vec3(0.0, chroma, intermediate) + offset;
  } else if (h < 4.0) {
    return vec3(0.0, intermediate, chroma) + offset;
  } else if (h < 5.0) {
    return vec3(intermediate, 0.0, chroma) + offset;
  } else {
    return vec3(chroma, 0.0, intermediate) + offset;
  }
}

void main() {
  vec4 color = texture2D(u_image, v_texcoord);
  vec3 hsv = rgbToHsv(color.rgb);
  hsv.z = 1.0 - hsv.z;

  gl_FragColor = vec4(hsvToRgb(hsv), color.a);
}
`;
