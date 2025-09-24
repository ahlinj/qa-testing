Feature('Creative sorting');

import assert from 'assert';

Scenario('Sorting by lastModified and Larger to smaller', async ({ I }) => {
    //1.
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    const response = await I.waitForResponse((res: any) => {
    return res.url().includes('/api/creativeVariants') && res.status() === 200;
    }, 5000);

    const data = await (response as any).json();

    const creatives = data.map((item: any) => ({
        creativeId: item.creativeId,
        dateModified: item.dateModified
    }));

    //2.
    I.waitForElement('.selectbox__select-row--selected', 5);
    I.see('Last modified creative', '.selectbox__select-row--selected p');

    //console.log(creatives);

    //3.
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

    const sortedCreativesIds = sortedCreatives.map(creative => creative.creativeId);

    assert.strictEqual(
        JSON.stringify(sortedCreativesIds), 
        JSON.stringify(creativeIdsOnPage),
        `Creative IDs don't match. API: ${sortedCreativesIds}, UI: ${creativeIdsOnPage}`
    );

    //4.
    I.waitForElement('.selectbox__select-row', 5);

    I.click('.selectbox__select-row');

    I.click(locate('p').withText('Larger to smaller'));

    //5.
    const sizeDivs = await I.grabTextFromAll(
    '.creative-variant .creative-variant-metadata__properties__info__size-label'
    );

    //console.log(sizeDivs);

    const surfaces = sizeDivs.map(text => {
        const match = text.match(/(\d+)×(\d+)/);
        if (match) {
            const width = parseInt(match[1]);
            const height = parseInt(match[2]);
            return width * height;
        }
        return null;
    }).filter(val => val !== null);

    //console.log(surfaces);

    const sortedDesc = [...surfaces].sort((a, b) => b - a);

    assert.strictEqual(
        JSON.stringify(surfaces), 
        JSON.stringify(sortedDesc), 
        'Surfaces should be sorted in descending order'
    );
});