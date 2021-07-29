import { browser, logging } from "protractor";

import { HomePage } from "../home/home.po";
import { SignInPage } from "../signin/signin.po";
import { SignUpPage } from "./signup.po";

describe('SignUp Page', () => {

    let signUpPage: SignUpPage = null;
    let signInPage: SignInPage = null;
    let homePage: HomePage = null;

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
                level: logging.Level.SEVERE
            } as logging.Entry));
    });

    beforeEach(async () => {
        signUpPage = new SignUpPage();
        signInPage = new SignInPage();
        homePage = new HomePage();
        await signUpPage.navigateTo();
    });

    it('Should be on Signup Page', async () => {
        const title = await signUpPage.getTitle();
        expect(title).toEqual(SignUpPage.PAGE_TITLE);
    });

    it('Should be register a user', async () => {
        const randomPrefix = Math.round(Math.random() * 100000);
        await signUpPage.fillField('email', `email${randomPrefix}@email.com`);
        await signUpPage.fillField('fullName', `some name${randomPrefix}`);
        const userName = `user${randomPrefix}`;
        await signUpPage.fillField('userName', userName);
        const password = '12345678';
        await signUpPage.fillField('password', password);
        await signUpPage.register();
        let title = await signInPage.getTitle();
        expect(title).toEqual(SignInPage.PAGE_TITLE);
        await signInPage.fillField('userName', userName);
        await signInPage.fillField('password', password);
        await signInPage.login();
        title = await homePage.getTitle();
        expect(title).toEqual(HomePage.PAGE_TITLE);
    });
});