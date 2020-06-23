/*!
 * @pixi/filter-bevel - v2.6.0
 * Compiled Fri, 20 Dec 2019 18:59:17 UTC
 *
 * @pixi/filter-bevel is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(o,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","pixi.js"],t):t(o.__filters={},o.PIXI)}(this,function(o,t){"use strict";var r="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",i="precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",n=function(o){function n(t){void 0===t&&(t={}),o.call(this,r,i),this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),t=Object.assign({rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},t),this.rotation=t.rotation,this.thickness=t.thickness,this.lightColor=t.lightColor,this.lightAlpha=t.lightAlpha,this.shadowColor=t.shadowColor,this.shadowAlpha=t.shadowAlpha}o&&(n.__proto__=o),n.prototype=Object.create(o&&o.prototype),n.prototype.constructor=n;var e={rotation:{configurable:!0},thickness:{configurable:!0},lightColor:{configurable:!0},lightAlpha:{configurable:!0},shadowColor:{configurable:!0},shadowAlpha:{configurable:!0}};return n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},e.rotation.get=function(){return this._angle/t.DEG_TO_RAD},e.rotation.set=function(o){this._angle=o*t.DEG_TO_RAD,this._updateTransform()},e.thickness.get=function(){return this._thickness},e.thickness.set=function(o){this._thickness=o,this._updateTransform()},e.lightColor.get=function(){return t.utils.rgb2hex(this.uniforms.lightColor)},e.lightColor.set=function(o){t.utils.hex2rgb(o,this.uniforms.lightColor)},e.lightAlpha.get=function(){return this.uniforms.lightAlpha},e.lightAlpha.set=function(o){this.uniforms.lightAlpha=o},e.shadowColor.get=function(){return t.utils.rgb2hex(this.uniforms.shadowColor)},e.shadowColor.set=function(o){t.utils.hex2rgb(o,this.uniforms.shadowColor)},e.shadowAlpha.get=function(){return this.uniforms.shadowAlpha},e.shadowAlpha.set=function(o){this.uniforms.shadowAlpha=o},Object.defineProperties(n.prototype,e),n}(t.Filter);o.BevelFilter=n,Object.defineProperty(o,"__esModule",{value:!0})}),Object.assign(PIXI.filters,this?this.__filters:__filters);