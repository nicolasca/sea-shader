varying vec2 vUv;

void main() {

    // Pattern 3
    // float strength = vUv.x;

    // Pattern 4
    // float strength = vUv.y;

    // Pattern 5
    // float strength = 1.0 - vUv.y;

    // Pattern 6
    // float strength = vUv.y * 10.0;

    // Pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern 8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.9, strength);

    // Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.9, strength);

    // Pattern 11
    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.x * 10.0, 1.0));

    // Pattern 12
    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.x * 10.0, 1.0));

    // Pattern 13
    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength *= step(0.5, mod(vUv.x * 10.0, 1.0));

    // Pattern 14
    // float strengthX = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strengthX *= step(0.4, mod(vUv.x * 10.0, 1.0));
    // float strengthY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // strengthY *= step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = strengthX + strengthY;

    // Pattern 15
    // float strengthX = step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // strengthX *= step(0.4, mod(vUv.x * 10.0, 1.0));
    // float strengthY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // strengthY *= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)) ;
    // float strength = strengthX + strengthY;

    // Pattern 16
    // float strength = abs(vUv.x  - 0.5);

    // Pattern 17
    // float strength = min(abs(vUv.x  - 0.5), abs(vUv.y  - 0.5)); 

    // Pattern 18
    // float strength = max(abs(vUv.x  - 0.5), abs(vUv.y  - 0.5)); 

    // Pattern 19
    float strength = step(0.2, max(abs(vUv.x  - 0.5), abs(vUv.y  - 0.5))); 


    gl_FragColor = vec4(strength, strength, strength, 1.0);
}