import React from 'react';
import CaseflowLink from '../../components/Link';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Link', () => {
  const to = 'test';

  it('renders Router Link', () => {
    const { container } = render(
      <MemoryRouter>
        <CaseflowLink to={to}>Test</CaseflowLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `/${to}`);
  });

  describe('has correct class names for button type', () => {
    it('for primary', () => {
      const { container } = render(
        <MemoryRouter>
          <CaseflowLink to={to} button="primary">Test</CaseflowLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');

      expect(link).toHaveClass('usa-button');
    });

    it('for secondary', () => {
      const { container } = render(
        <MemoryRouter>
          <CaseflowLink to={to} button="secondary">Test</CaseflowLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');

      expect(link).toHaveClass('usa-button-secondary');
    });

    it('for disabled', () => {
      const { container } = render(
        <MemoryRouter>
          <CaseflowLink to={to} button="disabled">Test</CaseflowLink>
        </MemoryRouter>
      );

      expect(container.querySelector('p')).toHaveClass('usa-button-disabled');
    });
  });

});
