/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createRef } from 'react';
import { Download } from '@sumup/icons';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  userEvent,
} from '../../util/test-utils';

import { Button, ButtonProps } from './Button';

describe('Button', () => {
  function renderButton<T>(renderFn: RenderFn<T>, props: ButtonProps) {
    return renderFn(<Button {...props} />);
  }

  const baseProps = { children: 'Button' };

  describe('styles', () => {
    it('should render a primary button by default', () => {
      const wrapper = renderButton(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a secondary button', () => {
      const wrapper = renderButton(create, {
        ...baseProps,
        variant: 'secondary',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a tertiary button', () => {
      const wrapper = renderButton(create, {
        ...baseProps,
        variant: 'tertiary',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a kilo button', () => {
      const wrapper = renderButton(create, { ...baseProps, size: 'kilo' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a giga button', () => {
      const wrapper = renderButton(create, { ...baseProps, size: 'giga' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a disabled button', () => {
      const wrapper = renderButton(create, { ...baseProps, disabled: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a stretched button', () => {
      const wrapper = renderButton(create, { ...baseProps, stretch: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a button with icon', () => {
      const wrapper = renderButton(create, { ...baseProps, icon: Download });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render with loading styles', () => {
    const wrapper = renderButton(create, {
      ...baseProps,
      isLoading: true,
      loadingLabel: 'Loading',
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('business logic', () => {
    it('should render as a link when passed the href prop', () => {
      const props = {
        ...baseProps,
        'href': '#',
        'onClick': jest.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(render, props);
      const buttonEl = getByTestId('link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should render as a custom element when passed the as prop', () => {
      const CustomLink = ({ children, ...props }: ButtonProps) => (
        <a {...props} href="https://sumup.com">
          {children}
        </a>
      );
      const props = {
        ...baseProps,
        'data-testid': 'custom-link-button',
        'as': CustomLink,
      };
      const { getByTestId } = renderButton(render, props);
      const buttonEl = getByTestId('custom-link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should render loading button with loading label', () => {
      const loadingLabel = 'Loading';
      const props = {
        ...baseProps,
        isLoading: true,
        loadingLabel,
      };

      const { getByText } = renderButton(render, props);
      expect(getByText(loadingLabel)).toBeVisible();
    });

    it('should call the onClick handler when clicked', async () => {
      const props = {
        ...baseProps,
        'onClick': jest.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(render, props);

      await userEvent.click(getByTestId('link-button'));

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should render as disabled', () => {
      const props = { ...baseProps, disabled: true };
      const { getByRole } = renderButton(render, props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render as disabled when loading', () => {
      const props = {
        ...baseProps,
        isLoading: true,
        loadingLabel: 'Loading',
      };
      const { getByRole } = renderButton(render, props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render as disabled when not loading', () => {
      const props = {
        ...baseProps,
        disabled: true,
        isLoading: false,
        loadingLabel: 'Loading',
      };
      const { getByRole } = renderButton(render, props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should accept a working ref for a button', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Button ref={tref}>This is a button</Button>,
      );
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    it('should accept a working ref for a link', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Button href="http://sumup.com" ref={tref}>
          Link button
        </Button>,
      );
      const anchor = container.querySelector('a');
      expect(tref.current).toBe(anchor);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Button>Button</Button>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });

    it('should meet accessibility guidelines for Loading button', async () => {
      const wrapper = renderToHtml(
        <Button isLoading={true} loadingLabel="Loading">
          Button
        </Button>,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });

    it('should have aria-busy and aria-live for a loading button', () => {
      const { getByRole } = renderButton(render, {
        ...baseProps,
        isLoading: true,
        loadingLabel: 'Loading...',
      });
      const button = getByRole('button');

      expect(button).toHaveAttribute('aria-live', 'polite');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should not have aria-busy and aria-live for a regular button', () => {
      const { getByRole } = renderButton(render, {
        ...baseProps,
      });
      const button = getByRole('button');

      expect(button).not.toHaveAttribute('aria-live');
      expect(button).not.toHaveAttribute('aria-busy');
    });
  });
});
