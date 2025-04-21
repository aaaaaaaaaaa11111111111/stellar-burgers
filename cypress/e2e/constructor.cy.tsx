describe('перехват запроса на эндпоинт ингридиентс', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('http://localhost:4000');
  });

  it('ожидаем, что ингриденты подгрузятся правильно', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
  });

  it('булка отсутствует до добавления', () => {
    cy.get('[data-cy=top-bun]').should('not.exist');
    cy.get('[data-cy=bottom-bun]').should('not.exist');
  });

  it('добавление булки и начинки в конструктор', () => {
    cy.get(
      '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093d] button[type=button]'
    )
      .click()
      .then(() => {
        cy.get('[data-cy=top-bun]')
          .contains('Флюоресцентная булка R2-D3')
          .should('exist');
        cy.get('[data-cy=bottom-bun]')
          .contains('Флюоресцентная булка R2-D3')
          .should('exist');
      });

    cy.get(
      '[data-cy=ingredient-item-643d69a5c3f7b9001cfa0941] button[type=button]'
    )
      .click()
      .then(() => {
        cy.get('[data-cy=mid-ingredient]')
          .contains('Биокотлета из марсианской Магнолии')
          .should('exist');
      });
  });

  it('открытие модального окна ингредиента', () => {
    cy.get('[data-cy=ingredient-item-643d69a5c3f7b9001cfa093e]').click();
    cy.get('[data-cy=ingredient-modal]')
      .should('be.visible')
      .contains('Филе Люминесцентного тетраодонтимформа');
  });

  it('закрытие по клику на крестик', () => {
    cy.get('[data-cy=ingredient-item-643d69a5c3f7b9001cfa093e]').click();
    cy.get('[data-cy=ingredient-modal]').should('be.visible');
    cy.get('[data-cy=ingredient-modal] button[type=button]').click();
    cy.get('[data-cy=ingredient-modal]').should('not.exist');
  });

  it('закрытие по клику на оверлей', () => {
    cy.get('[data-cy=ingredient-item-643d69a5c3f7b9001cfa093e]').click();
    cy.get('[data-cy=ingredient-modal]').should('be.visible');
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get('[data-cy=ingredient-modal]').should('not.exist');
  });

  it('cоздание заказа и проверка модального окна', () => {
    cy.wait('@getIngredients');
    cy.get(
      '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093c] button[type=button]'
    ).click();
    cy.get(
      '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093f] button[type=button]'
    ).click();
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=ingredient-modal]')
      .should('be.visible')
      .contains('123456');
    cy.get('[data-cy=ingredient-modal] button[type=button]').click();
    cy.get('[data-cy=ingredient-modal]').should('not.exist');
  });

  it('проверка, что конструктор пуст', () => {
    cy.get('[data-cy=top-bun]').should('not.exist');
    cy.get('[data-cy=mid-ingredient]').should('not.exist');
    cy.get('[data-cy=bottom-bun]').should('not.exist');
  });
});