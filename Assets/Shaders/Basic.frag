﻿//

#version 330 core

layout(location = 0) out vec4 outputColor;

//these are same for all shaders
uniform float ambientStrength; // dontUse
uniform vec3  ambientColor   ; // dontUse
uniform float sunIntensity   ; // dontUse
uniform float sunAngle       ; // dontUse
uniform vec3  sunColor       ; // dontUse
uniform vec3  viewpos        ; // dontUse

in vec3 worldSpacePosition;
in vec3 LocalPosition;
in vec3 Normal;
in vec2 texCoord;
in vec3 FragPos;

uniform sampler2D albedoTex;
uniform sampler2D AOTex;
uniform float AOIntensity = .2;

uniform vec4 color = vec4(1,1,1,1);

// no point light

void main()
{
    vec3 LightDirection = vec3(0, sin(sunAngle), cos(sunAngle));
    
    vec3 tex = texture(albedoTex, texCoord).xyz;
    // ao tex defaultly white
    float ao = texture(AOTex, texCoord).r * AOIntensity;

    vec3 L = normalize(LightDirection) * sunIntensity;
    
    float NdotL = clamp(dot(Normal,L), 0.2, 1.0);

    vec3 diffuseTerm = tex * sunColor * NdotL * ao;

    vec3 ambient = ambientColor * (ambientStrength / 10);

    outputColor = vec4(diffuseTerm + ambient, 1.0) * color;
}
