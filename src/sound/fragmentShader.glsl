precision mediump float;

varying float vRandom;


void main() {

    gl_FragColor = vec4(2.0 * vRandom, 0.5 * vRandom  , 0.2, 0.2 );
}

