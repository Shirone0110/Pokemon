var poke = JSON.parse(sessionStorage.getItem("poke"));
console.log(poke);

var show = function(poke)
{
    var box = d3.select("body").append("div");
    
    box.append("h1")
        .text(poke.name);
    
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
    
    box.append("h3")
        .text("Base experience")
    
    box.append("p")
        .text(poke.base_experience)
    
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
        .text("Height")
    
    box.append("p")
        .text(poke.height)
    
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
    
    box.append("h3")
        .text("Types")
    
    box.append("ol")
        .selectAll("li")
        .data(poke.types)
        .enter()
        .append("li")
        .text(function(d)
        {
            return d.type.name;
        })
    
    box.append("button")
        .text("Back")
        .on("click", function()
        {
            let url = new URL("https://shirone0110.github.io/Pokemon/");
            window.open(url, "_self");
        })
    
    d3.select("body").append("img")
        .attr("src",  "https://img.pokemondb.net/artwork/large/" + poke.name + ".jpg")
}

show(poke);