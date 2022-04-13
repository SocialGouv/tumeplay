describe('Test onboarding', () => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should pass onboarding', async () => {
    await expect(element(by.id('e2e-onboarding-container'))).toBeVisible();

    //STEP 1
    await expect(
      element(
        by.text(
          'Choisis une ou plusieurs thématiques et consulte des contenus pensés pour toi',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.id('e2e-onboarding-next-view'))).toBeVisible();
    await expect(element(by.text('Suivant'))).toBeVisible();
    await element(by.text('Suivant')).tap();

    //STEP 2
    await expect(
      element(
        by.text('Joue et teste tes connaissances sur la sexualité. Prêt.e ?'),
      ),
    ).toBeVisible();
    await expect(element(by.id('e2e-onboarding-next-view'))).toBeVisible();
    await expect(element(by.text('Suivant'))).toBeVisible();
    await element(by.text('Suivant')).tap();

    //STEP 3
    await expect(
      element(
        by.text(
          'Grâce aux badges remportés, joue, accumule des récompenses, et commande gratuitement un kit de ton choix ...',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.id('e2e-onboarding-next-view'))).toBeVisible();
    await expect(element(by.text('Je commence'))).toBeVisible();
    await element(by.text('Je commence')).tap();
  });
});
