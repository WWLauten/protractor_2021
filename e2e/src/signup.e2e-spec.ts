import { browser, logging } from "protractor";
import { SignUpPage } from "./signup.to";

describe('SignUp Page', () => {

    let signUpPage: SignUpPage = null;

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
                level: logging.Level.SEVERE
            } as logging.Entry));
    });

    beforeEach(async () => {
        signUpPage = new SignUpPage();
        await signUpPage.navigateTo();
    });

    it('Should be on Signup Page', async () => {
        const title = await signUpPage.getWindowTitle();
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
    });

});