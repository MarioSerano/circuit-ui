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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Body, spacing } from '@sumup/circuit-ui';

const Box = styled.div`
  ${({ theme, size }) => css`
    width: ${theme.spacings.tera};
    height: ${theme.spacings.tera};
    border-radius: ${theme.borderRadius[size]};
    background-color: ${theme.colors.r300};
    margin-right: ${theme.spacings.mega};
  `};
`;

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacings.mega};
  `};
`;

const BorderRadius = ({ size, ...props }) => (
  <Wrapper>
    <Box size={size} {...props} />
    <div>
      <Body as="span" noMargin>
        {size}
      </Body>
      <Body
        size="two"
        as="span"
        noMargin
        variant="subtle"
        css={spacing({ bottom: 'giga', left: 'kilo' })}
      >
        {light.borderRadius[size]}
      </Body>
    </div>
  </Wrapper>
);

BorderRadius.propTypes = {
  size: PropTypes.string.isRequired,
};

export default BorderRadius;
