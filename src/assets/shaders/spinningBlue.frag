precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

varying vec2 fragCoord;

void main (void)
{
    float intensity = 0.;

    for (float i = 0.; i < 54.; i++)
    {
        float angle = i/27. * 3.14159;
        vec2 xy = vec2(0.27 * cos(angle), 0.27 * sin(angle));
        xy += fragCoord.xy/resolution.y-0.5;
        intensity += pow(1000000., (0.77 - length(xy) * 1.9) * (1. + 0.275 * fract(-i / 27. - time))) / 80000.;
    }

    gl_FragColor = vec4(clamp(intensity * vec3(0.0777, 0.196, 0.27), vec3(0.), vec3(1.)), 0.);
}