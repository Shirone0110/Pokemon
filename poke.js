var pokenamePromise = d3.json("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=50");
var pokeabilityPromise = d3.json("https://pokeapi.co/api/v2/ability/?offset=20&limit=50");

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
    d3.select(col)
        .on("click", function()
        {
            pokemons.sort(function(a, b)
            {
                return (accessor(a) - accessor(b));
            })
            drawTable(pokemons);
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
