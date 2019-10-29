var pokenamePromise = d3.json("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50");
var pokeabilityPromise = d3.json("https://pokeapi.co/api/v2/ability/?offset=0&limit=50");

d3.select("#name").attr("clickcount", 0);
d3.select("#id").attr("clickcount", 0);
d3.select("#exp").attr("clickcount", 0);
d3.select("#height").attr("clickcount", 0);
d3.select("#weight").attr("clickcount", 0);

var header = ["#name", "#id", "#exp", "#height", "#weight"];

pokenamePromise.then( //get pokemon information
function (pokemons)
{
    console.log("pokemons", pokemons);
    //drawTable(pokemons);
    var promises = pokemons.results.map(function(d)
    {
        return info(d.name);
    })
    Promise.all(promises).then(function (poke)
    {
        poke.sort(function(a, b)
        {
            return a.id - b.id;
        })
        console.log(poke);
        drawTable(poke);
        makeHeader(poke);
        
    })
},
function (err)
{
    console.log("fail", err);
})

var makeHeader = function(pokemons)
{
    sortCol(pokemons, "#name", function(d) {return d.name;});
    sortCol(pokemons, "#id", function(d) {return d.id;});
    sortCol(pokemons, "#exp", function(d) {return d.base_experience;});
    sortCol(pokemons, "#height", function(d) {return d.height;});
    sortCol(pokemons, "#weight", function(d) {return d.weight;});
}

var sortCol = function(pokemons, col, accessor)
{
    Row(pokemons, pokemons);
    var Original = [];
    
    pokemons.forEach(function(item, index)
    {
        Original[index] = item;  
    })
    
    d3.select(col)
        .on("click", function()
        {
            var x = parseInt(d3.select(col).attr("clickcount"), 10);
            d3.select(col).attr("clickcount", (x + 1) % 2);
            header.forEach(function(item, index)
            {
                if (item != col) d3.select(item).attr("clickcount", -1);
                var cc = d3.select(item).attr("clickcount");
                var cell = d3.select(item);
                cell.selectAll("img").remove();
                if (cc == 1)
                {
                    cell.append("img")
                    .attr("src", "asc.png");
                }
                else if (cc == 0)
                {
                    cell.append("img")
                        .attr("src", "desc.png");
                }
            })
            pokemons.sort(function(a, b)
            {
                var cc = d3.select(col).attr("clickcount");
                if (cc == 1) return (accessor(b) - accessor(a));
                else return (accessor(a) - accessor(b));
            })
            drawTable(pokemons);
            Row(pokemons, Original);
        })
}

pokeabilityPromise.then( //this is for future use
function (abilities)
{
    console.log("abilities", abilities);
    //poke_ability(abilities);
},
function (err)
{
    console.log("fail", err);
})

var info = function(pokemon) //get full info of pokemon from its name
{
    var pokePromise = d3.json("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    return pokePromise
}

var addCol = function(rows, txt) //add column
{
    rows.append("td")
        .text(txt);
}

var show = function(pokemons, original, index)
{
    var box = d3.select("body");
    var poke = original[index - 1];
    
    console.log(original);
    
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
            return d.type.name + ": " + d.slot + " slot";
        })
}

var Row = function(pokemons, original)
{
    d3.selectAll("td")
        .on("click", function(d)
    {
        d3.selectAll("body *").remove();
        show(pokemons, original, d.id);
    })
}

var drawTable = function (poke)
{  
    d3.selectAll("tbody *").remove();
    
    var rows = d3.select("tbody")
                .selectAll("tr")
                .data(poke)
                .enter()
                .append("tr");
    
    addCol(rows, function(d){return d.name;});
    addCol(rows, function(d){return d.id;});
    addCol(rows, function(d){return d.base_experience;});
    addCol(rows, function(d){return d.height;});
    addCol(rows, function(d){return d.weight;});
}
