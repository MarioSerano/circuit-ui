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

import { forwardRef, HTMLAttributes, Ref } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { AsPropType, EmotionAsPropType } from '../../types/prop-types';
import { DeprecationError } from '../../util/errors';

type Size = 'one' | 'two';
type Variant = 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle';

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from 2 font sizes. Default `one`.
   */
  size?: Size;
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
  /**
   * The ref to the HTML DOM element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.regular};
`;

const sizeStyles = ({ theme, size = 'one' }: BodyProps & StyleProps) => css`
  font-size: ${theme.typography.body[size].fontSize};
  line-height: ${theme.typography.body[size].lineHeight};
`;

const variantStyles = ({ theme, variant }: BodyProps & StyleProps) => {
  switch (variant) {
    case 'highlight': {
      return css`
        font-weight: ${theme.fontWeight.bold};
      `;
    }
    case 'quote': {
      return css`
        font-style: italic;
        padding-left: ${theme.spacings.kilo};
        border-left: ${theme.borderWidth.mega} solid ${theme.colors.p500};
      `;
    }
    case 'confirm': {
      return css`
        color: ${theme.colors.confirm};
      `;
    }
    case 'alert': {
      return css`
        color: ${theme.colors.alert};
      `;
    }
    case 'subtle': {
      return css`
        color: ${theme.colors.n700};
      `;
    }
    default: {
      return null;
    }
  }
};

const marginStyles = ({ theme, noMargin }: BodyProps & StyleProps) =>
  !noMargin &&
  css`
    margin-bottom: ${theme.spacings.mega};
  `;

const StyledBody = styled('p', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<BodyProps>(baseStyles, sizeStyles, marginStyles, variantStyles);

function getHTMLElement(variant?: Variant): AsPropType {
  if (variant === 'highlight') {
    return 'strong';
  }
  if (variant === 'quote') {
    return 'blockquote';
  }
  return 'p';
}

/**
 * The Body component is used to present the core textual content
 * to our users.
 */
export const Body = forwardRef((props: BodyProps, ref?: BodyProps['ref']) => {
  if (
    process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !props.noMargin
  ) {
    throw new DeprecationError(
      'Body',
      'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.',
    );
  }

  const as = props.as || getHTMLElement(props.variant);
  return <StyledBody {...props} ref={ref} as={as as EmotionAsPropType} />;
});

Body.displayName = 'Body';
