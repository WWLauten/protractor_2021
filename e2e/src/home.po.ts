import { browser, by, element, protractor } from "protractor";

export class HomePage {

    static PAGE_TITLE = 'Timeline';

    navigateTo() {
        return browser.get(`${browser.baseUrl}#/user/flavio`);
    }

    getWindowTitle() {
        return browser.getTitle();
    }

    getPhotoListSize() {
        // retorna a lista com todas as fotos dentro da lista ap-photos.
        // count retorna uma promise para que possa esperar o Angular renderizar os elementos.
        return element
            .all(by.css('.photo'))
            .count();
    }

    fillSearchInputWith(text: string) {
        return element(by.css('ap-search input[type=search]'))
        .sendKeys(text);
    }

    clickOnFirstItemFromPhotoList() {
        // se tentarmos o método click do wrapper firstElement que retorna uma promise,
        // não vai funcionar, bug do Webdriver manager, então, vamos simular um ENTER.
        // await firstElement.click();
        return element
        .all(by.css('.photo'))
        .first()
        .sendKeys(protractor.Key.ENTER);
    }
}