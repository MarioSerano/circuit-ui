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

import { create, renderToHtml, axe, render } from '../../util/test-utils';

import { CloseButton } from './CloseButton';

describe('CloseButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CloseButton label="Close" />);
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<any>();
      const { container } = render(<CloseButton label="Close" ref={tref} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CloseButton label="Close" />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
