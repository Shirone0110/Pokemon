var pokenamePromise = d3.json("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=40");
var pokeabilityPromise = d3.json("https://pokeapi.co/api/v2/ability/?offset=20&limit=293");

pokenamePromise.then(
function (pokemons)
{
    console.log("pokemons", pokemons);
    poke_name(pokemons);
},
function (err)
{
    console.log("fail", err);
})

pokeabilityPromise.then(
function (abilities)
{
    console.log("abilities", abilities);
    poke_ability(abilities);
},
function (err)
{
    console.log("fail", err);
})

var info = function(pokemon)
{
    var pokePromise = d3.json("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    pokePromise.then(
    function (poke)
    {
        console.log("poke", poke);
    },
    function (err)
    {
        console.log("fail", err);
    })
    return poke;
}

var allinfo = [];

var poke_name = function (pokemons)
{    
    d3.select("#poke")
        .selectAll("div")
        .data(pokemons.results)
        .enter()
        .append("div")
        .text(function (d) {allinfo.push(info(d.name)); return d.name;})
}

var poke_ability = function(abilities)
{
    allinfo.forEach(function(item, index)
    {
        item.abilities.forEach(function(item, index)
        {
            
        })
    })
}