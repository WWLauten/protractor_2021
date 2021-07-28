import { browser, logging } from "protractor";
import { HomePage } from "./home.po";
import { SignInPage } from "./signin.po";
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
        await signUpPage.fillEmailField(`email${randomPrefix}@email.com`);
        await signUpPage.fillFullNameField(`some name${randomPrefix}`);
        const userName = `user${randomPrefix}`;
        await signUpPage.fillUserNameField(userName);
        const password = '12345678';
        await signUpPage.fillUPasswordField(password);
        await signUpPage.register();
        let title = await signInPage.getTitle();
        expect(title).toEqual(SignInPage.PAGE_TITLE);
        await signInPage.fillUserNameField(userName);
        await signInPage.fillPasswordField(password);
        await signInPage.login();
        title = await homePage.getTitle();
        expect(title).toEqual(HomePage.PAGE_TITLE);
    });
});