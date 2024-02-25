import { Page } from '@playwright/test';
import {Locator} from '@playwright/test';



export class data {
    gotomodal() {
        throw new Error('Method not implemented.');
    }
    private readonly page: Page;
    readonly url: string;
    readonly acceptall: string;
    readonly lista: Locator;
    readonly podnikatele: Locator;
    readonly produkty: Locator;
    readonly profiucet: Locator;
    readonly mamZajem: Locator;
    readonly objednat: Locator;
    readonly urlvariable: string;
    

    constructor (page: Page) {
        this.page = page; 

        //urls: 
        this.urlvariable = "" // currently empty, this part of URL can be modified if needed
        this.url = "http://kb.cz/" + this.urlvariable; // TVAR: "http://XX.YZ" 

        //locators: 
        this.lista=page.locator("//div[@class='bg-white w-full']");
        this.podnikatele = page.getByTestId("segment-desktop-5b13e6f2-bc20-41fa-a6d5-a36a68422762");
        this.produkty = page.getByText('Produkty');
        this.profiucet = page.getByRole('link', { name: 'Profi účet', exact: true });
        this. mamZajem = page.getByRole('link', { name: 'Mám zájem', exact: true });
        this.objednat = page.getByTestId('cta-0cdeae99-121e-4271-8aeb-0bf09f16ff54');
        } 


    async goto() {
        await this.page.goto(this.url);
        }


    async gotopodnikatele() {
        await this.podnikatele.click();
        }

    async pathtomodal() {
        //6) 
        //go to produkty: 
        await this.produkty.waitFor();
        await this.produkty.click(); 

        //7) 
        //go to profi účet: 
        await this.profiucet.click(); 

        //8) 
        //go to "sjednat"
        await this.mamZajem.waitFor();
        await this.mamZajem.click(); // goes to the bottom of the page

        //9) 
        //10) 
        //go to "objednat"
        await this.objednat.waitFor();
        await this.objednat.click(); // nodal Window opens
        }

}