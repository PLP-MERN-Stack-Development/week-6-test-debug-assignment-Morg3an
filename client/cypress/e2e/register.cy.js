describe('User Registration', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('registers successfully with valid input', () => {
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('form').submit();
        cy.url().should('include', '/dashboard');
    });

    it('shows error for missing fields', () => {
        cy.get('form').submit();
        cy.contains('Name is required');
        cy.contains('Email is required');
        cy.contains('Password is required');
    });

    it('shows error for invalid email', () => {
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('form').submit();
        cy.contains('Invalid email');
    });
});