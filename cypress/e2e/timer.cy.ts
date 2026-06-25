describe('Lofi Pomodoro App', () => {
  beforeEach(() => {
    // We use cy.clock to mock the Date and setTimeout/setInterval functions
    // Note: Cypress clock needs to be called before visiting the page
    cy.clock();
    cy.visit('/');
  });

  it('should display the initial 25:00 focus timer', () => {
    cy.get('[data-cy="timer-display"]').should('have.text', '25:00');
    cy.contains('Focus Session').should('be.visible');
  });

  it('should start the timer and tick down when play is clicked', () => {
    cy.get('[data-cy="toggle-btn"]').click();
    
    // Advance time by 2 seconds
    cy.tick(2000);
    
    // Timer should be 24:58
    cy.get('[data-cy="timer-display"]').should('have.text', '24:58');
  });

  it('should switch to break mode when focus time ends', () => {
    cy.get('[data-cy="toggle-btn"]').click();
    
    // Advance time by 25 minutes (25 * 60 * 1000 ms)
    cy.tick(25 * 60 * 1000);
    
    // Should be on break mode now, 5:00
    cy.contains('Break Time').should('be.visible');
    cy.get('[data-cy="timer-display"]').should('have.text', '05:00');
  });

  it('should allow user to customize timer settings', () => {
    // Open settings
    cy.get('[data-cy="settings-btn"]').click();
    
    // Change focus to 1 minute, break to 2 minutes
    cy.get('[data-cy="focus-time-input"]').clear().type('1');
    cy.get('[data-cy="break-time-input"]').clear().type('2');
    cy.get('[data-cy="settings-save-btn"]').click();

    // Timer display should update to 01:00
    cy.get('[data-cy="timer-display"]').should('have.text', '01:00');

    // Start and advance 1 minute
    cy.get('[data-cy="toggle-btn"]').click();
    cy.tick(60 * 1000);

    // Should switch to 2:00 break
    cy.contains('Break Time').should('be.visible');
    cy.get('[data-cy="timer-display"]').should('have.text', '02:00');
  });

  it('should allow skipping to the next session', () => {
    cy.get('[data-cy="skip-btn"]').click();
    
    // Should immediately go to break
    cy.contains('Break Time').should('be.visible');
    cy.get('[data-cy="timer-display"]').should('have.text', '05:00');
  });

  it('should handle todo list operations', () => {
    const todoText = 'Drink water';
    
    // Add todo
    cy.get('[data-cy="todo-input"]').type(`${todoText}{enter}`);
    
    // Check if it's added
    cy.contains('.todo-text', todoText).should('be.visible');
    
    // Toggle completed
    cy.get('[data-cy="todo-checkbox"]').click();
    
    // Verify completed class is applied
    cy.contains('.todo-text', todoText).should('have.class', 'completed');
  });
});
