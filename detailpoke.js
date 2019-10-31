var poke = JSON.parse(sessionStorage.getItem("poke"));
console.log(poke);

var show = function(poke)
{
    var box = d3.select("body").append("div").attr("id", "bigbox");
    
    d3.select("#bigbox").append("img")
        .attr("src",  "https://img.pokemondb.net/artwork/large/" + poke.name + ".jpg")
    
    box = d3.select("#bigbox").append("div").attr("id", "info");
    
    box.append("h1")
        .text(poke.name)
        .attr("id", "namepoke");
    
    box.append("span")
        .attr("class", "special")
        .text("Types: ")
    
    box.append("span")
        .text(function()
        {
            var s ='';
            poke.types.forEach(function(item, index)
            {
                if (index != poke.types.length - 1)
                s = s + item.type.name + '/ ';
                else s = s + item.type.name;
            })
        return s;
    })
    
    var table = box.append("table").attr("id", "pokeinfo");
    
    var row = table.append("tr");
    
    if (poke.id < 10) poke.id = '00' + poke.id;
    else if (poke.id < 100) poke.id = '0' + poke.id;
    
    row.append("td")
        .text("Pokemon No. " + poke.id);
    
    row.append("td")
        .text("Height: " + poke.height / 10 + " m");
    
    row = table.append("tr");
    
    row.append("td")
        .text("Base experience: " + poke.base_experience);
    
    row.append("td")
        .text("Weight: " + poke.weight / 10 + "kg");
    
    box = box.append("div").attr("id", "stat");
    
    box.append("h3")
        .text("Abilities");
    
    box.append("ul")
        .selectAll("li")
        .data(poke.abilities)
        .enter()
        .append("li")
        .text(function(d)
        {
            return d.ability.name;
        })
    
    /*box.append("h3")
        .text("Base experience")
    
    box.append("p")
        .text(poke.base_experience)*/
    
    box.append("h3")
        .text("Forms")
    
    box.append("ul")
        .selectAll("li")
        .data(poke.forms)
        .enter()
        .append("li")
        .text(function(d)
        {
            return d.name;
        })
    
    box.append("h3")
        .text("Stats")
    
    box.append("ol")
        .selectAll("li")
        .data(poke.stats)
        .enter()
        .append("li")
        .text(function(d)
        {
            return d.stat.name + ": " + d.base_stat;
        })
    
    box.append("button")
        .text("Back")
        .on("click", function()
        {
            let url = new URL("https://shirone0110.github.io/Pokemon/");
            window.open(url, "_self");
        })
}

show(poke);
