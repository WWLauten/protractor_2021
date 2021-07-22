// 'browser' é a "casquinha" do Protractror sobre o Selenium.
import { browser} from 'protractor'; 
import { HomePage } from './home.po';
describe('Home Page', () => {

    let homePage: HomePage;
    beforeEach(async () => {
        homePage = new HomePage();
        await homePage.navigateTo();
    });

    it('Should navigate to user profile', async () => {
        const title = await homePage.getWindowTitle();
        expect(title).toEqual('Timeline');
    });

    it('Should display a list of photos', async () => {
        const photoListSize = await homePage.getPhotoListSize();
        expect(photoListSize).toBeGreaterThan(0);
    });

    it('Should navigate to photo detail when photo navigation is triggered', async () => {
        await homePage.clickOnFirstItemFromPhotoList();
        const title = await browser.getTitle();
        expect(title).toBe('Photo detail');
    });

    it('Should list one item when filtering by word "farol"', async () => {
        await homePage.fillSearchInputWith('farol');
        const photoListSize = await homePage.getPhotoListSize();
        expect(photoListSize).toBe(1);
    });
})