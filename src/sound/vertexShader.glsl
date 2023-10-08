uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float u_freq;

attribute vec3 position;

varying float vRandom;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y +=  sin(u_freq * modelPosition.x) ;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vRandom = u_freq;
}



