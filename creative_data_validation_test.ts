import { assert } from "console";

Feature('Creative data validation');

Scenario('Text validation', async ({ I }) => {
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');
    
    const bannerParent = locate('.creative-variant__creative-unit.creative-variant__child--border-radius')
                        .withText('Banner');
    I.waitForElement(bannerParent, 5);

    const bannerIframeLocator = bannerParent.find('iframe');
    I.waitForElement(bannerIframeLocator, 5);

    I.switchTo(bannerIframeLocator);

    const bannerDiv = locate('.notranslate.celtra-banner');
    I.waitForElement(bannerDiv, 5);

    const nestedIframeLocator = bannerDiv.find('iframe');
    I.waitForElement(nestedIframeLocator, 5);
    I.switchTo(nestedIframeLocator);

    const visibleBanner = await I.executeScript(() => {
    return Array.from(document.querySelectorAll('div')).find(el => 
        el.textContent &&
        el.textContent.includes('Banner') &&
        el.getAttribute('dir') === 'ltr' &&
        el.style.display !== 'none' &&
        el.style.visibility !== 'hidden' &&
        el.style.fontFamily.includes('Arial') &&
        el.style.fontStyle.includes('normal') &&
        el.style.fontWeight.includes('400') &&
        el.style.letterSpacing.includes('0px') &&
        el.style.textAlign.includes('left') &&
        el.style.textTransform.includes('none') &&
        el.style.padding.includes('2px') &&
        el.style.color.includes('rgb(0, 0, 0)') &&
        el.style.whiteSpace.includes('pre-line') &&
        el.style.fontSize.includes('35px') &&
        el.style.lineHeight.includes('35px')
    );
    });

    //console.log(visibleBanner);
    assert(visibleBanner, 'Banner is not correctly displayed on the page');
});