Feature('Creative sorting ');

import assert from 'assert';

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

    const sortedCreativesIds = sortedCreatives.map(creative => creative.creativeId);

    assert.strictEqual(
        JSON.stringify(sortedCreativesIds), 
        JSON.stringify(creativeIdsOnPage),
        `Creative IDs don't match. API: ${sortedCreativesIds}, UI: ${creativeIdsOnPage}`
    );

    I.waitForElement('[data-id="selectbox-select-row"]', 5);

    I.click('[data-id="selectbox-select-row"] .selectbox__select-row');

    I.click(locate('p').withText('Larger to smaller'));

    const sizeDivs = await I.grabTextFromAll(
    '.creative-variant .creative-variant-metadata__properties__info__size-label'
    );

    //console.log(sizeDivs);

    const surfaces = sizeDivs.map(text => {
    const match = text.match(/(\d+)×(\d+)/);
    if (match) {
        const width = parseInt(match[1], 10);
        const height = parseInt(match[2], 10);
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