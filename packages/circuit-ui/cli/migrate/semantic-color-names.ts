/**
 * Copyright 2022, SumUp Ltd.
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

import { Transform } from 'jscodeshift';

import { findProperty } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const mappings = [
    ['theme.colors.success', 'theme.colors.confirm'],
    ['theme.colors.warning', 'theme.colors.notify'],
    ['theme.colors.danger', 'theme.colors.alert'],
  ];

  mappings.forEach(([prevValue, nextValue]) =>
    findProperty(j, root, prevValue).replaceWith(j.identifier(nextValue)),
  );

  return root.toSource();
};

export default transform;
