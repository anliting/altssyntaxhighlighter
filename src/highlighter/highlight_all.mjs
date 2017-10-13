import f1 from './highlight_all/f1.mjs'
import functions from './functions.mjs'
let
    highlighters=[{
        selector:'.highlighted_cpp',
        functionName:'highlightCpp',
    },{
        selector:'.highlighted_html',
        functionName:'highlightHtml',
    },{
        selector:'.highlighted_js',
        functionName:'highlightJs',
    },{
        selector:'.highlighted_tex',
        functionName:'highlightTex',
    }]
function highlight_all(e){
    e=e||document
    highlighters.map(highlighter=>{
        if(e.querySelectorAll(highlighter.selector).length==0)
            return
        f0.call(this,e,highlighter)
        f1.call(this,e,highlighter)
        f2.call(this,e,highlighter)
    })
}
function f0(e,highlighter){
    ;[
        ...e.querySelectorAll('span'+highlighter.selector)
    ].map(e=>{
        e.innerHTML=functions[highlighter.functionName].call(this,e.textContent)
        e.style.visibility=''
    })
}
function f2(e,highlighter){
    ;[
        ...e.querySelectorAll('script'+highlighter.selector)
    ].map(e=>{
        e.innerHTML=functions[highlighter.functionName].call(this,e.innerHTML)
        if(!e.classList.contains('bordered'))
            replaceByDiv(e)
    })
}
export default highlight_all