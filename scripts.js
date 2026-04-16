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
            pg.innerHTML = ""; // Clear the old page
            
            let raw = String(table[k]).split(",")[1] || "";
            let reg = /\(\(\((.+?)\s(.+?)\)\)\)/g, last = 0, m;
            
            while ((m = reg.exec(raw)) !== null) {
                // Add the text before the image
                pg.append(raw.substring(last, m.index));
                
                if (m[1] === "image") {
                    let i = document.createElement("img"); 
                    i.src = m[2]; 
                    i.style.width = "100%";
                    pg.appendChild(i);
                } else {
                    if (m[1] === "header") {
                        let i = document.createElement("h1")
                        i.innerHTML = m[2]
                        pg.appendChild(i)
                    } else {
                        if (m[1] === "bold") {
                            let i = document.createElement("label")
                            i.innerHTML = m[2]
                            pg.appendChild[i]
                        }
                    }
                }
                last = reg.lastIndex;
            }
            // Add any remaining text after the last image
            pg.append(raw.substring(last));
        };
    }
}, 500);
