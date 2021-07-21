// 'browser' é a "casquinha" do Protractror sobre o Selenium.
import { browser, element, by, protractor } from 'protractor'; 
describe('Home Page', () => {

    beforeEach(async () => {
        await browser.get('${browser.baseUrl}/#/user/flavio');
    });

    it('Should navigate to user profile', async () => {
        const title = await browser.getTitle();
        expect(title).toEqual('Timeline');
    });

    it('Should display a list of photos', async () => {
        // retorna a lista com todas as fotos dentro da lista ap-photos.
        // const list = element.all(by.css('ap-photos ap-photo'));

        // const list = element.all(by.css('.photo'));
        // const photoListSize = await list.count(); Melhorando o código:

        // count é uma promise para que possa esperar o Angular renderizar os elementos.
        const photoListSize = await element
            .all(by.css('.photo'))
            .count();
        // posso ao invés de usar toBe(3) tornar mais flexível o teste com toBeGreaterThan(0).
        expect(photoListSize).toBeGreaterThan(0);
    });

    it('Should navigate to photo detail when photo navigation is triggered', async () => {
        // se tentarmos o método click do wrapper firstElement que retorna uma promise,
        // não vai funcionar, bug do Webdriver manager, então, vamos simular um ENTER.
        // await firstElement.click();
        /* Melhorando o código: 
        const firstElement = element.all(by.css('.photo')).first();
        await firstElement.sendKeys(protractor.Key.ENTER); */
        await element
            .all(by.css('.photo'))
            .first()
            .sendKeys(protractor.Key.ENTER);
        const title = await browser.getTitle();
        expect(title).toBe('Photo detail');
    });

    it('Should list one item when filtering by word "farol"', async () => {
        /* Melhorando o código:
        const searchInput = element(by.css('ap-search input[type=search]'));
        await searchInput.sendKeys('farol');
        const list = element.all(by.css('.photo')); */
        await element(by.css('ap-search input[type=search]'))
            .sendKeys('farol')
        const photoListSize = await element 
            .all(by.css('.photo')) 
            .count();
        expect(photoListSize).toBe(1);

    });
})