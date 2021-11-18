const searchData = require('../data');

class Search {
    constructor(data){
        this.name = data.name;
        this.sites = data.sites;
    }

    static get all() {
        const searches = searchData.map((search) => new Search(search));
        return searches;
    }

    static findByName(name) {
        try {
            const aSearchData = searchData.filter((search) => search.name === name)[0];
            const search = new Search(aSearchData);
            return search;
        } catch(err){
            throw new Error("Can't find that search entry");
        };
    };
    
    static random(name){
        let selectedSearch = this.findByName(name);
        let int = Math.floor(Math.random() * selectedSearch.sites.length);
        return selectedSearch.sites[int];
    }
}

module.exports = Search;