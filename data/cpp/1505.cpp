#include <iostream>
#include <glm/gtc/matrix_transform.hpp>
#include <GL/glew.h>

#include "Light.h"
#include "Constant.h"


Light::Light()
{
    textureWidth_ = Constant::TextureWidth;
    textureHeight_ = Constant::TextureHeight;
    dephtBiasMVP_ = glm::mat4(
        0.5, 0.0, 0.0, 0.0,
        0.0, 0.5, 0.0, 0.0,
        0.0, 0.0, 0.5, 0.0,
        0.5, 0.5, 0.5, 1.0);
    GenerateDepthTexture();
}


Light::~Light()
{
    glDeleteBuffers(1, &framebuffer_);
    glDeleteTextures(1, &shadowMap_);
}

void Light::TransformPosition(const glm::mat4& modelView)
{
    transformedPosition_ = modelView * position_;
}

void Light::Apply(glm::mat4& view, glm::mat4& projection)
{
    projection = glm::ortho<float>(-50, 50, -50, 50, 1, 100);
    projection_ = projection;
    view = glm::lookAt(glm::vec3(position_), glm::vec3(0, 0, 0), glm::vec3(0, 1, 0));
    view_ = view;
}

void Light::GenerateDepthTexture()
{
    GLenum error = glGetError();
    glGenFramebuffers(1, &framebuffer_);
    glBindFramebuffer(GL_FRAMEBUFFER, framebuffer_);

    glGenTextures(1, &shadowMap_);
    glBindTexture(GL_TEXTURE_2D, shadowMap_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_DEPTH_COMPONENT16, textureWidth_, textureHeight_, 0, GL_DEPTH_COMPONENT, GL_FLOAT, 0);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_COMPARE_FUNC, GL_LEQUAL);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_COMPARE_MODE, GL_COMPARE_R_TO_TEXTURE);

    glFramebufferTexture(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, shadowMap_, 0);
    glDrawBuffer(GL_NONE);

    if (glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE)
        throw new std::exception("FUCK THIS");
    glBindFramebuffer(GL_FRAMEBUFFER, 0);
}

void Light::UseFrameBuffer()
{
    glBindFramebuffer(GL_FRAMEBUFFER, framebuffer_);
    glClear(GL_DEPTH_BUFFER_BIT);
    glViewport(0, 0, textureHeight_, textureHeight_);
}
