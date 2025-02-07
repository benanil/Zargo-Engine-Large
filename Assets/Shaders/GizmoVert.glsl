﻿#version 440 core
layout(location = 0) in vec3 aPosition;

uniform mat4 model;
uniform mat4 viewProjection;

void main()
{
	gl_Position = vec4(aPosition, 1) * model * viewProjection;
}
