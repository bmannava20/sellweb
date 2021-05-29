'use strict';

const chai = require('chai');
const expect = chai.expect;

test('renders with no data passed', async context => {
    const input = {};
    const output = await context.renderAsync(input);
    expect(output.html.toString()).to.not.contain('me-expander');
});

test('renders with min content passed', async context => {
    const input = {
        minContent: { renderBody: out => out.w('This is the minimum content') }
    };
    const output = await context.renderAsync(input);
    expect(output.html.toString()).to.contain('me-expander');
    expect(output.html.toString()).to.contain('me-expander-content__minimal');
});

test('renders with min & addl content passed', async context => {
    const input = {
        minContent: { renderBody: out => out.w('This is the minimum content') },
        addlContent: { renderBody: out => out.w('This is the additional content') }
    };
    const output = await context.renderAsync(input);
    expect(output.html.toString()).to.contain('me-expander');
    expect(output.html.toString()).to.contain('me-expander-content__minimal');
    expect(output.html.toString()).to.contain('me-expander-content__additional');
});
