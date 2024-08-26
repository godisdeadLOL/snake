import{n as oe,u as I,a as ne,h as U,k as ie,m as se,o as D,w as ae}from"./index-CPD2pglN.js";const $=Object.create(null),L=Object.create(null);function O(o,e){let t=L[o];return t===void 0&&($[e]===void 0&&($[e]=1),L[o]=t=$[e]++),t}let S;function ue(){if(!S){S="mediump";const o=oe();o&&o.getShaderPrecisionFormat&&(S=o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision?"highp":"mediump")}return S}function ce(o,e,t){return e?o:t?(o=o.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${o}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${o}
        `}function le(o,e,t){const r=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(o.substring(0,9)!=="precision"){let n=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;return n==="highp"&&r!=="highp"&&(n="mediump"),`precision ${n} float;
${o}`}else if(r!=="highp"&&o.substring(0,15)==="precision highp")return o.replace("precision highp","precision mediump");return o}function fe(o,e){return e?`#version 300 es
${o}`:o}const me={},de={};function pe(o,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const r=t?me:de;return r[e]?(r[e]++,e+=`-${r[e]}`):r[e]=1,o.indexOf("#define SHADER_NAME")!==-1?o:`${`#define SHADER_NAME ${e}`}
${o}`}function he(o,e){return e?o.replace("#version 300 es",""):o}const A={stripVersion:he,ensurePrecision:le,addProgramDefines:ce,setProgramName:pe,insertVersion:fe},M=Object.create(null),Y=class j{constructor(e){e={...j.defaultOptions,...e};const t=e.fragment.indexOf("#version 300 es")!==-1,r={stripVersion:t,ensurePrecision:{requestedFragmentPrecision:e.preferredFragmentPrecision,requestedVertexPrecision:e.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:ue()},setProgramName:{name:e.name},addProgramDefines:t,insertVersion:t};let n=e.fragment,i=e.vertex;Object.keys(A).forEach(a=>{const s=r[a];n=A[a](n,s,!0),i=A[a](i,s,!1)}),this.fragment=n,this.vertex=i,this._key=O(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(e){const t=`${e.vertex}:${e.fragment}`;return M[t]||(M[t]=new j(e)),M[t]}};Y.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let q=Y;const N={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function ge(o){return N[o]??N.float32}const ve={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function xe({source:o,entryPoint:e}){const t={},r=o.indexOf(`fn ${e}`);if(r!==-1){const n=o.indexOf("->",r);if(n!==-1){const i=o.substring(r,n),a=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let s;for(;(s=a.exec(i))!==null;){const u=ve[s[3]]??"float32";t[s[2]]={location:parseInt(s[1],10),format:u,stride:ge(u).stride,offset:0,instance:!1,start:0}}}}return t}function T(o){var m,d;const e=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,t=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,n=/var(<[^>]+>)? (\w+)/,i=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,s=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,l=(m=o.match(e))==null?void 0:m.map(f=>({group:parseInt(f.match(t)[1],10),binding:parseInt(f.match(r)[1],10),name:f.match(n)[2],isUniform:f.match(n)[1]==="<uniform>",type:f.match(i)[1]}));if(!l)return{groups:[],structs:[]};const c=((d=o.match(a))==null?void 0:d.map(f=>{const h=f.match(u)[1],v=f.match(s).reduce((x,b)=>{const[P,p]=b.split(":");return x[P.trim()]=p.trim(),x},{});return v?{name:h,members:v}:null}).filter(({name:f})=>l.some(h=>h.type===f)))??[];return{groups:l,structs:c}}var y=(o=>(o[o.VERTEX=1]="VERTEX",o[o.FRAGMENT=2]="FRAGMENT",o[o.COMPUTE=4]="COMPUTE",o))(y||{});function be({groups:o}){const e=[];for(let t=0;t<o.length;t++){const r=o[t];e[r.group]||(e[r.group]=[]),r.isUniform?e[r.group].push({binding:r.binding,visibility:y.VERTEX|y.FRAGMENT,buffer:{type:"uniform"}}):r.type==="sampler"?e[r.group].push({binding:r.binding,visibility:y.FRAGMENT,sampler:{type:"filtering"}}):r.type==="texture_2d"&&e[r.group].push({binding:r.binding,visibility:y.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Pe({groups:o}){const e=[];for(let t=0;t<o.length;t++){const r=o[t];e[r.group]||(e[r.group]={}),e[r.group][r.name]=r.binding}return e}function ye(o,e){const t=new Set,r=new Set,n=[...o.structs,...e.structs].filter(a=>t.has(a.name)?!1:(t.add(a.name),!0)),i=[...o.groups,...e.groups].filter(a=>{const s=`${a.name}-${a.binding}`;return r.has(s)?!1:(r.add(s),!0)});return{structs:n,groups:i}}const E=Object.create(null);class C{constructor(e){var s,u;this._layoutKey=0,this._attributeLocationsKey=0;const{fragment:t,vertex:r,layout:n,gpuLayout:i,name:a}=e;if(this.name=a,this.fragment=t,this.vertex=r,t.source===r.source){const l=T(t.source);this.structsAndGroups=l}else{const l=T(r.source),c=T(t.source);this.structsAndGroups=ye(l,c)}this.layout=n??Pe(this.structsAndGroups),this.gpuLayout=i??be(this.structsAndGroups),this.autoAssignGlobalUniforms=((s=this.layout[0])==null?void 0:s.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:e,fragment:t}=this,r=e.source+t.source+e.entryPoint+t.entryPoint;this._layoutKey=O(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=xe(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(e){const t=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return E[t]||(E[t]=new C(e)),E[t]}}const Z=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>"],_e=Z.reduce((o,e)=>(o[e]=!0,o),{});function Ge(o,e){switch(o){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const J=class Q{constructor(e,t){this._touched=0,this.uid=I("uniform"),this._resourceType="uniformGroup",this._resourceId=I("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,t={...Q.defaultOptions,...t},this.uniformStructures=e;const r={};for(const n in e){const i=e[n];if(i.name=n,i.size=i.size??1,!_e[i.type])throw new Error(`Uniform type ${i.type} is not supported. Supported uniform types are: ${Z.join(", ")}`);i.value??(i.value=Ge(i.type,i.size)),r[n]=i.value}this.uniforms=r,this._dirtyId=1,this.ubo=t.ubo,this.isStatic=t.isStatic,this._signature=O(Object.keys(r).map(n=>`${n}-${e[n].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};J.defaultOptions={ubo:!1,isStatic:!1};let Se=J;var F=(o=>(o[o.WEBGL=1]="WEBGL",o[o.WEBGPU=2]="WEBGPU",o[o.BOTH=3]="BOTH",o))(F||{});class ee extends ne{constructor(e){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:t,glProgram:r,groups:n,resources:i,compatibleRenderers:a,groupMap:s}=e;this.gpuProgram=t,this.glProgram=r,a===void 0&&(a=0,t&&(a|=F.WEBGPU),r&&(a|=F.WEBGL)),this.compatibleRenderers=a;const u={};if(!i&&!n&&(i={}),i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!t&&n&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!t&&n&&s)for(const l in s)for(const c in s[l]){const m=s[l][c];u[m]={group:l,binding:c,name:m}}else if(t&&n&&!s){const l=t.structsAndGroups.groups;s={},l.forEach(c=>{s[c.group]=s[c.group]||{},s[c.group][c.binding]=c.name,u[c.name]=c})}else if(i){n={},s={},t&&t.structsAndGroups.groups.forEach(m=>{s[m.group]=s[m.group]||{},s[m.group][m.binding]=m.name,u[m.name]=m});let l=0;for(const c in i)u[c]||(n[99]||(n[99]=new U,this._ownedBindGroups.push(n[99])),u[c]={group:99,binding:l,name:c},s[99]=s[99]||{},s[99][l]=c,l++);for(const c in i){const m=c;let d=i[c];!d.source&&!d._resourceType&&(d=new Se(d));const f=u[m];f&&(n[f.group]||(n[f.group]=new U,this._ownedBindGroups.push(n[f.group])),n[f.group].setResource(d,f.binding))}}this.groups=n,this._uniformBindMap=s,this.resources=this._buildResourceAccessor(n,u)}addResource(e,t,r){var n,i;(n=this._uniformBindMap)[t]||(n[t]={}),(i=this._uniformBindMap[t])[r]||(i[r]=e),this.groups[t]||(this.groups[t]=new U,this._ownedBindGroups.push(this.groups[t]))}_buildResourceAccessor(e,t){const r={};for(const n in t){const i=t[n];Object.defineProperty(r,i.name,{get(){return e[i.group].getResource(i.binding)},set(a){e[i.group].setResource(a,i.binding)}})}return r}destroy(e=!1){var t,r;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(r=this.glProgram)==null||r.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(n=>{n.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(e){const{gpu:t,gl:r,...n}=e;let i,a;return t&&(i=C.from(t)),r&&(a=q.from(r)),new ee({gpuProgram:i,glProgram:a,...n})}}let Ce=0;class Ue{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,r){const n=new ie({...this.textureOptions,width:e,height:t,resolution:1,antialias:r,autoGarbageCollect:!0});return new se({source:n,label:`texturePool_${Ce++}`})}getOptimalTexture(e,t,r=1,n){let i=Math.ceil(e*r-1e-6),a=Math.ceil(t*r-1e-6);i=D(i),a=D(a);const s=(i<<17)+(a<<1)+(n?1:0);this._texturePool[s]||(this._texturePool[s]=[]);let u=this._texturePool[s].pop();return u||(u=this.createTexture(i,a,n)),u.source._resolution=r,u.source.width=i/r,u.source.height=a/r,u.source.pixelWidth=i,u.source.pixelHeight=a,u.frame.x=0,u.frame.y=0,u.frame.width=e,u.frame.height=t,u.updateUvs(),this._poolKeyHash[u.uid]=s,u}getSameSizeTexture(e,t=!1){const r=e.source;return this.getOptimalTexture(e.width,e.height,r._resolution,t)}returnTexture(e){const t=this._poolKeyHash[e.uid];this._texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const r=this._texturePool[t];if(r)for(let n=0;n<r.length;n++)r[n].destroy(!0)}this._texturePool={}}}const Ve=new Ue;function k(o,e,t){if(o)for(const r in o){const n=r.toLocaleLowerCase(),i=e[n];if(i){let a=o[r];r==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),t&&i.push(`//----${t}----//`),i.push(a)}else ae(`${r} placement hook does not exist in shader`)}}const $e=/\{\{(.*?)\}\}/g;function H(o){var r;const e={};return(((r=o.match($e))==null?void 0:r.map(n=>n.replace(/[{()}]/g,"")))??[]).forEach(n=>{e[n]=[]}),e}function V(o,e){let t;const r=/@in\s+([^;]+);/g;for(;(t=r.exec(o))!==null;)e.push(t[1])}function W(o,e,t=!1){const r=[];V(e,r),o.forEach(s=>{s.header&&V(s.header,r)});const n=r;t&&n.sort();const i=n.map((s,u)=>`       @location(${u}) ${s},`).join(`
`);let a=e.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${i}
`),a}function K(o,e){let t;const r=/@out\s+([^;]+);/g;for(;(t=r.exec(o))!==null;)e.push(t[1])}function Ae(o){const t=/\b(\w+)\s*:/g.exec(o);return t?t[1]:""}function Me(o){const e=/@.*?\s+/g;return o.replace(e,"")}function Te(o,e){const t=[];K(e,t),o.forEach(u=>{u.header&&K(u.header,t)});let r=0;const n=t.sort().map(u=>u.indexOf("builtin")>-1?u:`@location(${r++}) ${u}`).join(`,
`),i=t.sort().map(u=>`       var ${Me(u)};`).join(`
`),a=`return VSOutput(
                ${t.sort().map(u=>` ${Ae(u)}`).join(`,
`)});`;let s=e.replace(/@out\s+[^;]+;\s*/g,"");return s=s.replace("{{struct}}",`
${n}
`),s=s.replace("{{start}}",`
${i}
`),s=s.replace("{{return}}",`
${a}
`),s}function X(o,e){let t=o;for(const r in e){const n=e[r];n.join(`
`).length?t=t.replace(`{{${r}}}`,`//-----${r} START-----//
${n.join(`
`)}
//----${r} FINISH----//`):t=t.replace(`{{${r}}}`,"")}return t}const g=Object.create(null),w=new Map;let Ee=0;function we({template:o,bits:e}){const t=te(o,e);if(g[t])return g[t];const{vertex:r,fragment:n}=Re(o,e);return g[t]=re(r,n,e),g[t]}function ze({template:o,bits:e}){const t=te(o,e);return g[t]||(g[t]=re(o.vertex,o.fragment,e)),g[t]}function Re(o,e){const t=e.map(a=>a.vertex).filter(a=>!!a),r=e.map(a=>a.fragment).filter(a=>!!a);let n=W(t,o.vertex,!0);n=Te(t,n);const i=W(r,o.fragment,!0);return{vertex:n,fragment:i}}function te(o,e){return e.map(t=>(w.has(t)||w.set(t,Ee++),w.get(t))).sort((t,r)=>t-r).join("-")+o.vertex+o.fragment}function re(o,e,t){const r=H(o),n=H(e);return t.forEach(i=>{k(i.vertex,r,i.name),k(i.fragment,n,i.name)}),{vertex:X(o,r),fragment:X(e,n)}}const Be=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,je=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,Fe=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Oe=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,Ie={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},De={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function We({bits:o,name:e}){const t=we({template:{fragment:je,vertex:Be},bits:[Ie,...o]});return C.from({name:e,vertex:{source:t.vertex,entryPoint:"main"},fragment:{source:t.fragment,entryPoint:"main"}})}function Ke({bits:o,name:e}){return new q({name:e,...ze({template:{vertex:Fe,fragment:Oe},bits:[De,...o]})})}const Xe={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Ye={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},z={};function Le(o){const e=[];if(o===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let r=0;r<o;r++)e.push(`@group(1) @binding(${t++}) var textureSource${r+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${r+1}: sampler;`)}return e.join(`
`)}function Ne(o){const e=[];if(o===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let t=0;t<o;t++)t===o-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function qe(o){return z[o]||(z[o]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${Le(o)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Ne(o)}
            `}}),z[o]}const R={};function ke(o){const e=[];for(let t=0;t<o;t++)t>0&&e.push("else"),t<o-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uTextures[${t}], vUV);`),e.push("}");return e.join(`
`)}function Ze(o){return R[o]||(R[o]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${o}];

            `,main:`

                ${ke(o)}
            `}}),R[o]}const Je={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Qe={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},B={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},et={...B,vertex:{...B.vertex,header:B.vertex.header.replace("group(1)","group(2)")}},tt={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class rt{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(e,t,r,n){const i=this.renderable,a=this.texture,s=i.groupTransform,u=s.a,l=s.b,c=s.c,m=s.d,d=s.tx,f=s.ty,h=this.bounds,v=h.maxX,x=h.minX,b=h.maxY,P=h.minY,p=a.uvs,_=i.groupColorAlpha,G=n<<16|this.roundPixels&65535;e[r+0]=u*x+c*P+d,e[r+1]=m*P+l*x+f,e[r+2]=p.x0,e[r+3]=p.y0,t[r+4]=_,t[r+5]=G,e[r+6]=u*v+c*P+d,e[r+7]=m*P+l*v+f,e[r+8]=p.x1,e[r+9]=p.y1,t[r+10]=_,t[r+11]=G,e[r+12]=u*v+c*b+d,e[r+13]=m*b+l*v+f,e[r+14]=p.x2,e[r+15]=p.y2,t[r+16]=_,t[r+17]=G,e[r+18]=u*x+c*b+d,e[r+19]=m*b+l*x+f,e[r+20]=p.x3,e[r+21]=p.y3,t[r+22]=_,t[r+23]=G}packIndex(e,t,r){e[t]=r+0,e[t+1]=r+1,e[t+2]=r+2,e[t+3]=r+0,e[t+4]=r+2,e[t+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}function ot(o,e,t){const r=(o>>24&255)/255;e[t++]=(o&255)/255*r,e[t++]=(o>>8&255)/255*r,e[t++]=(o>>16&255)/255*r,e[t++]=r}export{rt as B,C as G,F as R,ee as S,Ve as T,Se as U,Xe as a,O as b,We as c,B as d,q as e,ge as f,qe as g,ot as h,Ke as i,Ye as j,Ze as k,et as l,Qe as m,tt as n,Je as r};
