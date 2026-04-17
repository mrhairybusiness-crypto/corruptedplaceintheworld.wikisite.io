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
