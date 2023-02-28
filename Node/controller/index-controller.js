export class IndexController {
    index(req, res) {
        res.sendFile('C:/Users/fabia/Documents/Informatik/DisSys/Challenge/WE2 vorlage/twitter.html');
    };
}

export const indexController = new IndexController();
