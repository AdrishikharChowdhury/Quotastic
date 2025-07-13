let submit=document.querySelector("#submit");
let share=document.querySelector("#share");
let quoteText=document.querySelector("#quote-text");
let quoteAuthor=document.querySelector("#quote-author");
let quote=document.querySelector("#quote");
let authorInfo=document.querySelector("#author-info");
let author=document.querySelector("#author");
let authorSlug="";

const BASE_URL=`https://api.quotable.io/`

const randomQuote=async (e) => {
    quote.style.backgroundImage="";
    try {
        quote.style.height="max-content";
        let response1=await fetch(`${BASE_URL}random`);
        let data1=await response1.json();
        quoteText.innerText=`"${data1.content}"`;
        quoteAuthor.innerText=`~${data1.author}`;
        authorSlug=data1.authorSlug;
        share.style.display="flex";
        author.style.display="flex";
        authorInfo.style.display="none";
    } catch (error) {
        alert('Fetch failed: ' + error.message);
        quote.innerHTML="";
        quote.style.backgroundImage="url(./assets/images/20064239_6199763.svg)";
        quote.style.height="40rem";
    }
}

submit.addEventListener("click",randomQuote);
document.addEventListener("keydown",(event)=>{
    if(event.key ==="Enter" || event.code==="Space" || event.key===" "){
        randomQuote(event);
    }
    else{
        return;
    }
});

author.addEventListener("click", async (params) => {
    let response2=await fetch(`${BASE_URL}authors?slug=${authorSlug}`);
    let data2=await response2.json();
    let authorName=document.createElement("p");
    let authorBio=document.createElement("p");
    authorName.id="author-name";
    authorBio.id="author-bio";
    authorInfo.style.display="flex";
    authorInfo.innerHTML="";
    authorName.innerText=`${data2.results[0].name}`;
    authorBio.innerText=`${data2.results[0].bio}`;
    authorInfo.append(authorName,authorBio);

})

share.addEventListener("click",async ()=>{
    const textCopy= `Random Quote Of the Day\n\n${quoteText.innerText}\n\n${quoteAuthor.innerText}`;
    await navigator.clipboard.writeText(textCopy);
    share.innerText="Copied To Clipboard";
    setTimeout(()=>{share.innerHTML=`Share <i class="fa-regular fa-paper-plane"></i>`},1500);
})