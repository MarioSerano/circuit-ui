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

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { Stack } from '../../../../.storybook/components';

import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Base = () => (
  <Spinner
    css={(theme: Theme) =>
      css`
        color: ${theme.colors.p500};
      `
    }
  />
);
export const Sizes = () => (
  <Stack>
    <Spinner
      css={(theme: Theme) =>
        css`
          color: ${theme.colors.p500};
        `
      }
      size="byte"
    />
    <Spinner
      css={(theme: Theme) =>
        css`
          color: ${theme.colors.p500};
        `
      }
      size="kilo"
    />
    <Spinner
      css={(theme: Theme) =>
        css`
          color: ${theme.colors.p500};
        `
      }
      size="giga"
    />
  </Stack>
);
