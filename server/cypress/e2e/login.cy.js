describe('User Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('logs in with valid credentials', () => {
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('form').submit();
        cy.url().should('include', '/dashboard');
    });

    it('fails with wrong password', () => {
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('wrongpass');
        cy.get('form').submit();
        cy.contains('Invalid credentials');
    });

    it('shows error on empty input', () => {
        cy.get('form').submit();
        cy.contains('Email is required');
        cy.contains('Password is required');
    });
});