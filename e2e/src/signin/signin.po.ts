import { browser, by, element } from "protractor";

export class SignInPage {
    static PAGE_TITLE = 'Sign in';

    getTitle() {
        return browser.getTitle();
    }

    fillField(formControlName: string, text: string) {
        return element(by.css(`input[formControlName=${formControlName}]`))
            .sendKeys(text);
    }
    
    login() {
        return element(by.css('button[type=submit]'))
            .click();
    }
}