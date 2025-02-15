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

import Carousel from './Carousel';
import { SLIDES } from './__fixtures__';

describe('Carousel', () => {
  describe('styles', () => {
    it('should not render without slides data', () => {
      const actual = create(<Carousel />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles', () => {
      const actual = create(<Carousel slides={SLIDES} />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with default paused styles', () => {
      const actual = create(<Carousel slides={SLIDES} autoPlay={false} />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with children as a function', () => {
      const actual = create(
        <Carousel slides={SLIDES}>
          {({ state }) => <h1>Carousel heading for step #{state.step}</h1>}
        </Carousel>,
      );

      expect(actual).toMatchSnapshot();
    });

    it('should render with children as a node', () => {
      const actual = create(
        <Carousel slides={SLIDES}>
          <h1>Carousel heading</h1>
        </Carousel>,
      );

      expect(actual).toMatchSnapshot();
    });

    it('should render without controls', () => {
      const actual = create(<Carousel hideControls />);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Carousel slides={SLIDES} />);
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
