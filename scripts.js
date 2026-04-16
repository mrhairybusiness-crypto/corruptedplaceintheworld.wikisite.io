setTimeout(async () => {
    const pg = document.getElementById("pg"), 
          wikis = document.getElementById("wikis");
    
    // Using your Read-Only Access Key now!
    const res = await fetch('https://api.jsonbin.io/v3/b/69dcdcd036566621a8aa9593', {
        headers: {
            'X-Access-Key': '$2a$10$5GcbTFLB7Du1O4i9OvPAAeC8ff6Iyod7yvFQCUfdKh4h4QQflulfy',
            'X-Bin-Meta': 'false' // This makes the data easier to read
        }
    });
    
    const table = await res.json();

    for (let k in table) {
        const b = document.createElement("button");
        b.innerText = k;
        b.style.width = "100%";
        wikis.appendChild(b);
        
        b.onclick = () => {
            pg.style.visibility = "visible";
            pg.innerHTML = ""; // Clear existing content
        
            // 1. Get the raw text safely
            let fullContent = String(table[k]);
            let raw = fullContent.includes(",") ? fullContent.split(",")[1] : fullContent;
            
            console.log("Processing text:", raw); // DEBUG: Check this in F12 console
        
            // 2. Updated Regex for ((type value))
            // Matches ((image url)), ((header text)), or ((bold text))
            let reg = /\(\((image|header|bold)\s(.+?)\)\)/g;
            let last = 0, m;
        
            while ((m = reg.exec(raw)) !== null) {
                // Append text found BEFORE the tag
                pg.append(raw.substring(last, m.index));
        
                const type = m[1];  // image, header, or bold
                const value = m[2]; // The content inside
                let el;
        
                if (type === "image") {
                    el = document.createElement("img");
                    el.src = value.trim();
                    el.style.width = "100%";
                    el.style.display = "block";
                } else if (type === "header") {
                    el = document.createElement("h1");
                    el.textContent = value;
                } else if (type === "bold") {
                    el = document.createElement("strong");
                    el.textContent = value;
                }
        
                if (el) pg.appendChild(el);
                last = reg.lastIndex;
            }
            
            // 3. Append any text found AFTER the last tag
            pg.append(raw.substring(last));
        };                   
    }
}, 500);
