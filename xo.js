
let arr=[];
let count=0;
let head=document.getElementsByTagName('h3')[0];
let span=document.getElementsByTagName('span')[0];
for(let i=1;i<10;i++)
{
    arr[i]=document.getElementById(i);
}
function win()
{
   if(arr[1].innerText==arr[2].innerText&&arr[2].innerText==arr[3].innerText&&arr[1].innerText!='')
     finish(arr[1].innerText);
   else if(arr[4].innerText==arr[5].innerText&&arr[5].innerText==arr[6].innerText&&arr[4].innerText!='')
        finish(arr[4].innerText);
    else if(arr[7].innerText==arr[8].innerText&&arr[8].innerText==arr[9].innerText&&arr[7].innerText!='')
        finish(arr[7].innerText);
    else if(arr[1].innerText==arr[4].innerText&&arr[4].innerText==arr[7].innerText&&arr[1].innerText!='')
        finish(arr[1].innerText);
    else if(arr[2].innerText==arr[5].innerText&&arr[5].innerText==arr[8].innerText&&arr[2].innerText!='')
        finish(arr[2].innerText);
    else if(arr[3].innerText==arr[6].innerText&&arr[6].innerText==arr[9].innerText&&arr[3].innerText!='')
        finish(arr[3].innerText);
    else if(arr[1].innerText==arr[5].innerText&&arr[5].innerText==arr[9].innerText&&arr[1].innerText!='')
        finish(arr[1].innerText);
    else if(arr[3].innerText==arr[5].innerText&&arr[5].innerText==arr[7].innerText&&arr[3].innerText!='')
        finish(arr[3].innerText);
else 
{
    let count=0;
    arr.forEach(item=>{
        if(item.innerText!='')
        count++;
        })
    if(count==9)
    { 
    finish("draw")
}
}
}
function finish(winner)
{
    if(winner!="draw")
   { 
    span.innerText=winner +" Winner";
}
else 
{
    span.innerText="X O";
}
    setInterval(
        function f()
        {
span.innerText+='.';
        },500
    )
    setTimeout(function(){location.reload();},2500)
}
function Click(i)
{
    if(count==0)
    {
        head.style.display="none"
    }
    if(count%2==0)
    {
if(arr[i].innerText=='')
{
    arr[i].innerText="O";
    span.innerText="X";
    count++;

} 
}
else 
{
if(arr[i].innerText=='')
{    arr[i].innerText="X";
    span.innerText="O";
    count++;

}
}
win();
}

