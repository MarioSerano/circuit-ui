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

import { useState, ChangeEvent } from 'react';

import { SelectorGroup, SelectorGroupProps } from './SelectorGroup';
import docs from './SelectorGroup.docs.mdx';

export default {
  title: 'Forms/Selector/SelectorGroup',
  component: SelectorGroup,
  parameters: {
    docs: { page: docs },
  },
};

const baseArgs = {
  name: 'selector-group',
  label: 'Choose your favourite fruit',
  options: [
    { children: 'Apple', value: 'apple', noMargin: true },
    { children: 'Banana', value: 'banana', noMargin: true },
    { children: 'Mango', value: 'mango', noMargin: true },
    { children: 'I like all fruits', value: 'all', noMargin: true },
  ],
};

export const Base = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

Base.args = baseArgs;

export const Multiple = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue((prev) =>
      prev.includes(event.target.value)
        ? prev.filter((v) => v !== event.target.value)
        : [...prev, event.target.value],
    );
  };

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={handleChange}
      stretch={false}
    />
  );
};

Multiple.args = { ...baseArgs, multiple: true };
