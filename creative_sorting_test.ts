Feature('Creative filtering ');



Scenario('grab creativeVariants from network', async ({ I }) => {
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    const response = await I.waitForResponse((res: any) => {
    return res.url().includes('/api/creativeVariants') && res.status() === 200;
    }, 5000);

    const data = await (response as any).json();

    const creatives = data.map((item: any) => ({
    creativeId: item.creativeId,
    dateModified: item.dateModified
    }));

    //console.log(creatives);

    const sortedCreatives = creatives.sort((a, b) => b.dateModified - a.dateModified);

    //console.log(sortedCreatives);

    I.seeNumberOfVisibleElements('.creative-variant', 3);

    const idDivs = await I.grabTextFromAll(
        locate('.creative-variant div').withText('ID:')
    );

    const creativeIdsOnPage = idDivs
        .map(text => text
        .replace('ID: ', '')
        .trim())
        .filter(id => id.length === 8);


    //console.log(creativeIdsOnPage);

    for (let i = 0; i < creativeIdsOnPage.length; i++) {
        if (sortedCreatives[i].creativeId !== creativeIdsOnPage[i]) {
        throw new Error(
            `Mismatch at index ${i}: API=${sortedCreatives[i]}, UI=${creativeIdsOnPage[i]}`
        );
        }
    }

    

});