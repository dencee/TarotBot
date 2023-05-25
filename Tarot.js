document.addEventListener( 'DOMContentLoaded', () => {

    const headerEl = document.getElementById("header");
    const responseEl = document.getElementById("response");
    const corsButtonEl = document.getElementById("corscall");
    const noCorsButtonEl = document.getElementById("nocorscall");

    async function corsCall(message) {

        const endPoint = `https://aiserver-production.up.railway.app/models`;

        let response = '';
        try{
            response = await fetch(endPoint, {
                method: "GET"
            });

            const data = await response.json();
            responseEl.innerText = data;

        } catch(error){
            responseEl.innerText = error;
        }
    }

    async function noCorsCall(message) {

        const endPoint = `https://tarotbotbackend-production.up.railway.app/reading`;

        const response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": `application/json`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "What is the meaning of life?",
                temperature: 0.7,
                max_tokens: 2000,
            })
        });

        const data = await response.json();
        responseEl.innerText = data.choices[0].text;
    }

    corsButtonEl.addEventListener('click', corsCall);
    noCorsButtonEl.addEventListener('click', noCorsCall);
      
}); 