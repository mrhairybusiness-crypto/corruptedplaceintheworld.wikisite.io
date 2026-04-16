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
            pg.innerHTML = ""; 
            
            let fullContent = String(table[k]);
            let raw = fullContent.includes(",") ? fullContent.split(",")[1] : fullContent;
            
            // The [^]+? allows the regex to match across MULTIPLE LINES (newlines)
            let reg = /\(\((image|header|bold)\s([^]+?)\)\)/g;
            let last = 0, m;
            
            while ((m = reg.exec(raw)) !== null) {
                // Add text before the tag
                pg.append(raw.substring(last, m.index));
                
                let type = m[1];
                let value = m[2];
                let el;
        
                if (type === "image") {
                    el = document.createElement("img");
                    el.src = value.trim();
                    el.style.width = "100%";
                    el.style.display = "block";
                    el.style.margin = "10px 0";
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
            
            // Add the final chunk of text (this is what was "cutting off")
            pg.append(raw.substring(last));
        };                            
    }
}, 500);
