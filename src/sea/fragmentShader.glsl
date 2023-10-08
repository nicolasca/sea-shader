uniform vec3 uDeepBlueColor;
uniform vec3 uSurfaceBlueColor;
uniform float uColorMultiplier;
uniform float uColorOffset;

varying float vWaveElevation;

void main() {

    float rectifiedElevation = (vWaveElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDeepBlueColor, uSurfaceBlueColor, rectifiedElevation);
    gl_FragColor = vec4(color, 1.0);
}