/**
 * Copyright 2020, SumUp Ltd.
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

import { JSCodeshift, Collection } from 'jscodeshift';

type Import = {
  type: 'default' | 'named';
  local: string;
  name?: string;
};

function findNotEmpty(collections: Collection[]) {
  for (let index = 0; index < collections.length; index += 1) {
    const collection = collections[index];

    if (collection.length > 0) {
      return collection;
    }
  }
  return collections[0];
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
export function findImportsByPath(
  j: JSCodeshift,
  root: Collection,
  importPath: string,
): Import[] {
  const imports: Import[] = [];

  const importDeclaration = findNotEmpty(
    // The babel and TypeScript parsers use different node types.
    ['Literal', 'StringLiteral'].map((type) =>
      root.find(j.ImportDeclaration, {
        source: {
          // @ts-ignore
          type,
          // @ts-ignore
          value: importPath,
        },
      }),
    ),
  );

  importDeclaration.forEach((nodePath) => {
    nodePath.value.specifiers.forEach((specifier: unknown) => {
      if (j.ImportDefaultSpecifier.check(specifier)) {
        imports.push({
          type: 'default',
          // @ts-ignore
          local: specifier.local.name,
        });
      } else {
        imports.push({
          type: 'named',
          // @ts-ignore
          name: specifier.imported.name,
          // @ts-ignore
          local: specifier.local.name,
        });
      }
    });
  });

  return imports;
}
/* eslint-enable @typescript-eslint/ban-ts-comment */

export function findStyledComponentNames(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
): string[] {
  const styledComponents: string[] = [];

  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'styled',
      },
      arguments: [
        {
          type: 'Identifier',
          name: componentName,
        },
      ],
    })
    .forEach((path) => {
      const styledComponent: string = j(path)
        .closest(j.VariableDeclaration)
        .find(j.Identifier)
        .get(0).node.name;
      styledComponents.push(styledComponent);
    });

  return styledComponents;
}

export function findLocalNames(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
): string[] | null {
  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');

  const [baseName, subName] = componentName.split('.');

  const componentImport = imports.find((i) => i.name === baseName);

  if (!componentImport) {
    return null;
  }

  const localName = subName
    ? `${componentImport.local}.${subName}`
    : componentImport.local;

  const styledComponents = findStyledComponentNames(j, root, localName);

  return [localName, ...styledComponents];
}

export function renameJSXAttribute(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
  fromName: string,
  toName: string,
): void {
  root
    .findJSXElements(componentName)
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: fromName,
      },
    })
    .replaceWith((nodePath) =>
      j.jsxAttribute(j.jsxIdentifier(toName), nodePath.node.value),
    );
}

export function findProperty(
  j: JSCodeshift,
  root: Collection,
  path: string,
): Collection {
  const [parent, ...properties] = path.split('.');
  const query = properties.reduce(
    (acc, property) => ({
      type: 'MemberExpression',
      object: acc,
      property: {
        name: property,
      },
    }),
    { name: parent } as object,
  );
  return root.find(j.MemberExpression, query);
}
