const request = require('supertest');

const server = require('../app');

describe('API server', () => {
    let api;

    beforeAll(() => {
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /search with status 200', (done) => {
        request(api).get('/search').expect(200, done);
    });

    it('retrieves a search by name', (done) => {
        request(api)
            .get('/search/pingu')
            .expect(200)
            .expect({name: "pingu", 
                sites: [
                {url: 'https://en.wikipedia.org/wiki/Pingu', title: 'Pingu - Wikipedia', description: "Pingu is the main character of the show, a typically playful, sometimes naughty, curious little penguin. His name comes from the German word for penguin, ..."},
                {url: 'https://www.youtube.com/channel/UCM88mtSE0zRTn5ae4EbYcuw', title: 'Pingu - Official Channel - YouTube', description: "The Official Pingu Youtube ChannelPingu is a charming and cheeky young penguin who is always up to mischief. Along with his mom, dad, little sister, ..."},
                {url: 'https://www.imdb.com/title/tt0100366/', title: 'Pingu (TV Series 1980–2006) - IMDb', description: "Who is Pingu? He's a charming and cheeky young penguin who lives in the snow and ice of the South Pole. Often finding himself in tricky and comical situations, ..."},
                {url: 'https://www.abc.net.au/news/2021-11-13/pingu-lost-antarctic-penguin-swims-to-new-zealand/100618346', title: "Antarctic penguin 'Pingu' travels 3,000 kilometres from ... - ABC", description: "An Adélie penguin swims to the shores of New Zealand, ..."},
                {url: 'https://www.pingu.jp/biz/about/', title: "ABOUT PINGU｜'Pingu' English Site", description: "Pingu was born in 1984, by the plasticine brainchild of animators Otmar Gutmann and Harald Muecke. Ever since Pingu made his first appearance in several ..."},
                {url: 'https://pingu.fandom.com/wiki/Pingu_in_the_City', title: 'Pingu in the City', description: "Pingu in the City (Japanese:ピングー in ザ・シティ) is a Japanese computer-animated television series produced by Mattel Creations and Polygon Pictures, ..."},
                {url: 'https://www.bbc.co.uk/programmes/b006mh02', title: 'Pingu - CBeebies - BBC', description: "Preschool stop-frame animation about Pingu, a charming and cheeky young penguin."},
                {url: 'https://www.theguardian.com/tv-and-radio/2016/jan/11/how-we-made-pingu-childrens-tv-animation', title: 'How we made Pingu | Animation on TV | The Guardian', description: " A famous Italian clown called Carlo Bonomi voiced the first four series of Pingu. He did all the characters, using an invented language of ..."},
                {url: 'https://pingusenglish.com/about/meet-pingu-and-friends/', title: 'Meet Pingu and Friends', description: "Pingu's English helps turn the lives of fictional characters into a real-life English language experience – all in a way that speaks directly to pre-school ..."},
                {url: 'https://www.urbandictionary.com/define.php?term=Pingu', title: 'Pingu - Urban Dictionary', description: "An animated penguin who was seen in the old TV show by the name of Pingu."}
            ]}, done);
    });

    it('retrieves a random website', (done) => {
        request(api)
            .get('/search/pingu/random')
            .expect(200, done)
    });

    it('responds to a unknown search name with a 404', (done) => {
        request(api).get('/search/latvia').expect(404).expect({}, done);
    });

    it('uploads a value to the parameter', (done) => {
        request(api).put('/store').send('pingu').expect(204, done);
    })

    it('saves parameter after upload', () => {
        request(api).put('/store').send('pingu');
        request(api).get('/store').expect(200).expect('pingu');
    })

    it('resets parameter', async () => {
        await request(api).put('/store').send('pingu');
        await request(api).put('/store').send('');
        request(api).get('/store').expect(200).expect('');
    })    
})