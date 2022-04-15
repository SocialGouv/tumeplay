describe('Test tumeplay app', () => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should pass onboarding & signup', async () => {
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

    //SIGNUP
    await expect(element(by.text('ton profil'))).toBeVisible();
    await element(by.id('e2e-signup-firstname')).typeText('LeTesteur');
    await element(
      by
        .id('android_picker_headless')
        .withAncestor(by.id('android_touchable_wrapper')),
    )
      .atIndex(0)
      .tap();
    await element(by.text('13-15 ans')).tap();
    await element(
      by
        .id('android_picker_headless')
        .withAncestor(by.id('android_touchable_wrapper')),
    )
      .atIndex(1)
      .tap();
    await element(by.text('Région Île-de-France')).tap();

    await expect(element(by.text('Je valide mon profil'))).toBeVisible();
    await element(by.text('Je valide mon profil')).tap();
  });

  it('should pass tutorial', async () => {
    //STEP 1
    await expect(
      element(
        by.text(
          'Retrouve sur l’écran d’accueil les derniers articles parus et les vidéos TikTok',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.text('Ok'))).toBeVisible();
    await element(by.text('Ok')).tap();

    //STEP 2
    await expect(
      element(
        by.text('Consulte l’ensemble de nos articles classés par thématiques'),
      ),
    ).toBeVisible();
    await expect(element(by.text('Ok'))).toBeVisible();
    await element(by.text('Ok')).tap();

    //STEP 3
    await expect(
      element(
        by.text(
          'Accède directement au jeu, réponds aux question et débloque l’accès aux kits',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.text('Ok'))).toBeVisible();
    await element(by.text('Ok')).tap();

    //STEP 4
    await expect(
      element(
        by.text(
          'Observe ta progression dans le jeu et quel niveau te permet de débloquer un kit',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.text('Ok'))).toBeVisible();
    await element(by.text('Ok')).tap();

    //STEP 5
    await expect(
      element(
        by.text(
          'Et enfin, retrouve les kits que tu as débloqués et passe commande pour te faire livrer',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.text('Ok'))).toBeVisible();
    await element(by.text('Ok')).tap();
  });

  it('should see fresh contents', async () => {
    await expect(element(by.id('e2e-fresh-content-card-0'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-1'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-2'))).toExist();
    await element(by.id('e2e-carousel-view')).swipe('left', 'slow', 0.9);
    await expect(element(by.id('e2e-fresh-content-card-2'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-3'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-4'))).toExist();
    await element(by.id('e2e-carousel-view')).swipe('left', 'slow', 0.9);
    await expect(element(by.id('e2e-fresh-content-card-4'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-5'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-6'))).toExist();
    await element(by.id('e2e-carousel-view')).swipe('left', 'slow', 0.9);
    await expect(element(by.id('e2e-fresh-content-card-6'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-7'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-8'))).toExist();
    await element(by.id('e2e-carousel-view')).swipe('left', 'slow', 0.9);
    await expect(element(by.id('e2e-fresh-content-card-8'))).toBeVisible();
    await expect(element(by.id('e2e-fresh-content-card-9'))).toBeVisible();
  });

  it('should access to one content', async () => {
    await expect(element(by.text('Posts'))).toBeVisible();
    await element(by.text('Posts')).tap();
    await expect(element(by.id('e2e-theme-card-0'))).toBeVisible();
    await element(by.id('e2e-theme-card-0')).tap();
    await expect(element(by.id('e2e-content-card-0'))).toBeVisible();
    await element(by.id('e2e-content-card-0')).tap();
    await expect(element(by.id('e2e-content-page-topbar'))).toBeVisible();
    await waitFor(element(by.id('e2e-content-page-header')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('e2e-content-page-description'))).toBeVisible();
    const attr = await element(by.id('e2e-feedback-good')).getAttributes();
    console.log(attr);
  });

  it('should be able to play quizz from home button', async () => {
    await expect(element(by.text('Jouer')).atIndex(0)).toBeVisible();
    await element(by.text('Jouer')).atIndex(0).tap();
    await waitFor(element(by.id('e2e-question-container')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('VRAI')).tap();
  });

  it('should be able to play quizz from navbar button', async () => {
    await expect(element(by.text('Jouer')).atIndex(1)).toBeVisible();
    await element(by.text('Jouer')).atIndex(1).tap();
    await waitFor(element(by.id('e2e-question-container')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
