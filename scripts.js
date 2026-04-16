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
            pg.textContent = ""; // Use textContent to clear
        
            let raw = String(table[k]).split(",")[1] || "";
            let reg = /\(\(\((.+?)\s(.+?)\)\)\)/g, last = 0, m;
        
            while ((m = reg.exec(raw)) !== null) {
                pg.append(raw.substring(last, m.index));
        
                const [_, type, value] = m;
                let el;
        
                if (type === "image") {
                    el = document.createElement("img");
                    el.src = value;
                    el.style.width = "100%";
                } else if (type === "header") {
                    el = document.createElement("h1");
                    el.textContent = value;
                } else if (type === "bold") {
                    el = document.createElement("strong"); // Better than label for bold text
                    el.textContent = value;
                }
        
                if (el) pg.appendChild(el);
                last = reg.lastIndex;
            }
            pg.append(raw.substring(last));
        };        
    }
}, 500);
