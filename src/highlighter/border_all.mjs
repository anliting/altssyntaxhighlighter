import core from './core.mjs'
let{dom,html}=core.althea
function text_border(s){
    let
        countOfLines,
        logCountOfLines
    s=splitSourceByNewlineCharacter(s)
    countOfLines=s.split('\n').length-1
    logCountOfLines=Math.floor(Math.round(
        Math.log(countOfLines)/Math.log(10)*1e6
    )/1e6)
    return table()
    function splitSourceByNewlineCharacter(source){
        return splitElementByNewlineCharacter(
            dom('div',{innerHTML:source})
            )
    }
    function splitElementByNewlineCharacter(e){
        return[...e.childNodes].map(node=>
            node.nodeType==Node.TEXT_NODE?
                html.encodeText(node.wholeText)
            :
                splitElementByNewlineCharacter(
                    node
                ).split('\n').map(s=>(
                    node.innerHTML=s,
                    node.outerHTML
                )).join('\n')
        ).join('')
    }
    function table(){
        let lines=s.split('\n')
        lines.pop()
        return dom('table',
            lines.map(s=>s+'\n').map((e,i)=>
                tr(i,e)
            )
        )
    }
    function tr(i,s){
        return dom('tr',
            tr=>{tr.dataset.lineNumber=i+1},
            td_lineNumber(i),
            dom('td',{className:'content',innerHTML:s})
        )
    }
    function td_lineNumber(i){
        return dom('td',{className:'lineNumber'},td=>{
            td.dataset.lineNumber=i+1
            td.style.width=6*(logCountOfLines+1)+'pt'
        })
    }
}
async function border_all(e){
    e=e||document
    for(let f of e.querySelectorAll('div.bordered'))
        dom(f,
            {innerHTML:''},
            text_border(f.innerHTML),
            f=>{f.style.visibility=''}
        )
    for(let f of e.querySelectorAll('script.bordered'))
        replaceByDiv(
            dom(f,{innerHTML:''},
                text_border(f.innerHTML)
            )
        )
}
function replaceByDiv(e){
    let div=dom('div',e.firstChild)
    for(let i=0;i<e.classList.length;i++)
        div.classList.add(e.classList[i])
    e.parentNode.insertBefore(div,e)
    e.parentNode.removeChild(e)
    return div
}
export default border_all
