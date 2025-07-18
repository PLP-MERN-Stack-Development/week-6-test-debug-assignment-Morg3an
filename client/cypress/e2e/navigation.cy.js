describe('Navigation & Route Protection', () => {
    it('navigates to public pages', () => {
        cy.visit('/');
        cy.contains('Home');
        cy.visit('/about');
        cy.contains('About Us');
    });

    it('redirects unauthenticated access to protected routes', () => {
        cy.visit('/dashboard');
        cy.url().should('include', '/login');
    });

    it('navigates to protected pages after login', () => {
        cy.login();
        cy.visit('/dashboard');
        cy.contains('Welcome back');
    });
});