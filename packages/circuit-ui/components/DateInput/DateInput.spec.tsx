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

import { render, renderToHtml, axe } from '../../util/test-utils';

import DateInput from '.';

describe('DateInput', () => {
  const baseProps = { label: 'Date', noMargin: true };

  it('should accept a working ref', () => {
    const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
    const { container } = render(<DateInput {...baseProps} ref={tref} />);
    const input = container.querySelector('input');
    expect(tref.current).toBe(input);
  });

  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<DateInput {...baseProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
