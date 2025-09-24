Feature('Creative filtering');

Scenario('Format and size filters', async ({ I }) => {
    //1.
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    //2.
    I.waitForElement('.creative-variant',5);
    I.seeNumberOfVisibleElements('.creative-variant',3);

    //3.
    I.click('.filter-new');
    I.waitForElement('.inline-dialog');
    I.click(locate('span').withText('Format'));
    I.waitForElement('.filter-component');
    I.click('Universal Banner');
    I.waitForClickable('Apply');
    I.waitForElement('div.dialog-button__container--medium', 5);
    I.click(locate('div.dialog-button__container--medium').withChild(locate('div').withText('Apply')));

    //4.
    I.seeNumberOfVisibleElements('.creative-variant',1);

    //5.
    I.click('.filter-new');
    I.waitForElement('.inline-dialog');
    I.click(locate('span').withText('Size'));
    I.waitForElement('.filter-component');
    I.click(locate('span').withText('320×50'));
    I.waitForClickable('Apply');
    I.waitForElement('div.dialog-button__container--medium', 5);
    I.click(locate('div.dialog-button__container--medium').withChild(locate('div').withText('Apply')));

    //6.
    I.seeNumberOfVisibleElements('.creative-variant',0);

    //7.
    I.click(locate('.chip__remove-btn'));
    I.click(locate('.chip__remove-btn'));

    //8.
    I.waitForElement('.creative-variant',5);
    I.seeNumberOfVisibleElements('.creative-variant',3);
});