import { test, expect } from '@playwright/test';
import { data } from '../pom_data.ts';



//before each test:  
test.beforeEach(async({page}) => {
    //1)
    const pomdata = new data(page);
    pomdata.goto(); //URL can be modified in pom_data.ts file

    }
);

//after each test:  
test.afterEach(async({page}) => {
    page.close(); 

    }
);


test('Test Komercni Banka - create a profi ucet', async ({page, context}) => {   
    const pomdata = new data(page);

    //variables
    const jmeno = "Hugo Boss";
    const mesto = 'Kladno';
    const telcislo = '723992003';
    const useremail = 'Hugo.Boss@gmail.com';


    //2) 
    //in case cookies bar appears: 
    const lista=await page.locator("//div[@class='bg-white w-full']"); //cookies bar
    const cookiesbar = await page.getByTestId("cookie-bar-accept-all"); //cookies bar - accept all

    
    expect(lista).toBeVisible();
    await cookiesbar.click(); //accepts all cookies

    //3)
    const cookies = await context.cookies(); //gets all cookies
    let CMSCookie = cookies.find((c) => c.name === "CMSCookieLevelValue"); //finds a specific cookie
    const CMSCookieValue = CMSCookie.value;
    expect(CMSCookieValue).toBe('preferential%7Canalytical%7Cmarketing'); //expect true 
    console.log('Value of cookie: ' + CMSCookieValue);


     //4) 
    await pomdata.gotopodnikatele(); // click on 'Podnikatelé a Firmy'

    //5) 
    expect(lista).not.toBeVisible(); // make sure lista (cookie popup) is not visible

     //6-11): Path to modal window 
    await pomdata.pathtomodal();

    //12) 
    //name: 
    const name = await page.getByPlaceholder('Karel Novák');
    await name.waitFor();
    await name.fill(jmeno); // name filled

    //phone number
    const phone = await page.getByPlaceholder('777 123 456');
    await phone.fill(telcislo); // filled phone number

    //email
    const email = await page.getByPlaceholder('karel.novak@email.cz');
    await email.fill(useremail); //filled email

    //13) 
    //confirm
    const confirm = await page.locator('[data-test="confirmBtn"]');
    confirm.click(); //user is on step 2 of creating a profi account

    //14) 
    const place = await page.getByPlaceholder('Zadejte adresu');
    await place.waitFor();
    await place.fill(mesto); // name filled

    //15) 
    //whisperer
    const whisperer = await page.getByRole('listbox'); 
    await whisperer.waitFor();
    await page.getByRole('option', {name: 'Kladno 1'}).click(); // whisperer selected
  
     //16) 
    //tab seznam is present: 
    const seznam = await page.getByTestId('tab-list');
    await seznam.waitFor();
    expect(seznam).toBeVisible();
    expect(seznam).toHaveText('Seznam'); // true if Seznam is present 
    await seznam.click();

    //tab mapa is present: 
    const mapa = await page.getByTestId('tab-map');
    await mapa.waitFor();
    expect(mapa).toBeVisible();
    expect(mapa).toHaveText('Mapa'); // true if Mapa is present
    await mapa.click(); //click on mapa tab
    await seznam.click(); //go back to seznam tab

    //17) 
    //Načíst další místa: 
    await page.getByText('Načíst další').click();

    //18) 
    const allbranches = await page.$$('//button[@class="btn btn-secondary branchOption ng-star-inserted"]');
    
    console.log('Number of branches: ' + allbranches.length);
    expect(allbranches).toHaveLength(10);



   // npx playwright test first_test.test.ts
   //npx playwright test


    }
)