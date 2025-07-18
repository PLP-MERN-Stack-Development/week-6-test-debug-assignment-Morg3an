describe('Post CRUD & Protected Routes', () => {
    beforeEach(() => {
        cy.login(); // custom command to login (see support/commands.js)
        cy.visit('/posts');
    });

    it('creates a new post', () => {
        cy.contains('New Post').click();
        cy.get('input[name="title"]').type('My Test Post');
        cy.get('textarea[name="content"]').type('This is a test post.');
        cy.get('form').submit();
        cy.contains('My Test Post');
    });

    it('edits an existing post', () => {
        cy.contains('Edit').first().click();
        cy.get('input[name="title"]').clear().type('Updated Post Title');
        cy.get('form').submit();
        cy.contains('Updated Post Title');
    });

    it('deletes a post', () => {
        cy.contains('Delete').first().click();
        cy.contains('Are you sure').should('exist');
        cy.contains('Confirm').click();
        cy.contains('Post deleted');
    });

    it('redirects unauthenticated users', () => {
        cy.clearCookies();
        cy.visit('/posts');
        cy.url().should('include', '/login');
    });
});