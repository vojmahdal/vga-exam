# OpenGL Shadery pro barvení statických a pohybujících se objektů

Tento repozitář obsahuje GLSL shadery, které vykreslují objekt s předanou barvou vrcholu, pokud je objekt statický. Pokud se objekt pohybuje (pouze posun, ne rotace), je vykreslen červenou barvou.

## Vertex Shader
Vertex shader zpracovává pozice a barvy vrcholů, aplikuje projekční a modelview matici a detekuje pohyb porovnáním aktuální a předchozí modelview matice.

```glsl
#version 330 core

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aColor;

uniform mat4 projection;
uniform mat4 modelview;
uniform mat4 prevModelview;

out vec3 vertexColor;
out float isMoving;

void main() {
    gl_Position = projection * modelview * vec4(aPos, 1.0);
    
    // Extrakce posunové složky z aktuální a předchozí modelview matice
    vec3 currentTranslation = modelview[3].xyz;
    vec3 prevTranslation = prevModelview[3].xyz;
    
    // Kontrola, zda se objekt pohybuje (změna posunu)
    isMoving = length(currentTranslation - prevTranslation) > 0.0001 ? 1.0 : 0.0;
    
    vertexColor = aColor;
}
```

## Fragment Shader
Fragment shader vykreslí barvu vrcholu pro statické objekty nebo červenou barvu pro pohybující se objekty.

```glsl
#version 330 core

in vec3 vertexColor;
in float isMoving;

out vec4 FragColor;

void main() {
    if (isMoving > 0.5) {
        FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Červená